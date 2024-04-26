package com.kun.scentquest.fragrance;

import com.kun.scentquest.common.PageResponse;
import com.kun.scentquest.exception.OperationNotPermittedException;
import com.kun.scentquest.file.FileStorageService;
import com.kun.scentquest.user.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class FragranceService {

    private final FragranceMapper fragranceMapper;
    private final FragranceRepository fragranceRepository;
    private final FileStorageService fileStorageService;

    public Integer save(FragranceRequest request, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
        Fragrance fragrance = fragranceMapper.toFragrance(request);
        fragrance.setAdder(user);
        return fragranceRepository.save(fragrance).getFragranceId();
    }


    public FragranceResponse findById(Integer fragranceId) {
        return fragranceRepository.findById(fragranceId)
                .map(fragranceMapper::toFragranceResponse)
                .orElseThrow(() -> new RuntimeException("Fragrance not found"));
    }


    public PageResponse<FragranceResponse> findAllFragrances(int page, int size, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();

        Pageable pageable = PageRequest.of(page, size, Sort.by("name").ascending());
        Page<Fragrance> fragrances = fragranceRepository.findAllFragrancesPageable(pageable);
        List<FragranceResponse> fragranceResponses = fragrances.stream()
                .map(fragranceMapper::toFragranceResponse)
                .toList();


        return new PageResponse<>(
                fragranceResponses,
                fragrances.getNumber(),
                fragrances.getSize(),
                fragrances.getTotalElements(),
                fragrances.getTotalPages(),
                fragrances.isFirst(),
                fragrances.isLast());
    }

    public PageResponse<FragranceResponse> findAllFragrancesByOwner(int page, int size, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
        Pageable pageable = PageRequest.of(page, size, Sort.by("name").ascending());
        Page<Fragrance> fragrances = fragranceRepository.findAll(FragranceSpecification.withOwnerId(user.getId()), pageable);

        List<FragranceResponse> fragranceResponses = fragrances.stream()
                .map(fragranceMapper::toFragranceResponse)
                .toList();
        return new PageResponse<>(
                fragranceResponses,
                fragrances.getNumber(),
                fragrances.getSize(),
                fragrances.getTotalElements(),
                fragrances.getTotalPages(),
                fragrances.isFirst(),
                fragrances.isLast());
    }

    public PageResponse<FragranceResponse> findAllFragrancesByNote(int page, int size, Authentication connectedUser, String fragranceNote) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("name").ascending());
        Page<Fragrance> fragrances = fragranceRepository.findAllByNotesName(pageable, fragranceNote);

        List<FragranceResponse> fragranceResponses = fragrances.stream()
                .map(fragranceMapper::toFragranceResponse)
                .toList();


        return new PageResponse<>(
                fragranceResponses,
                fragrances.getNumber(),
                fragrances.getSize(),
                fragrances.getTotalElements(),
                fragrances.getTotalPages(),
                fragrances.isFirst(),
                fragrances.isLast());
    }

    public PageResponse<FragranceResponse> findAllFragrancesByPerfumer(int page, int size, Authentication connectedUser, Integer perfumerId) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("name").ascending());
        Page<Fragrance> fragrances = fragranceRepository.findAllByPerfumerId(pageable, perfumerId);

        List<FragranceResponse> fragranceResponses = fragrances.stream()
                .map(fragranceMapper::toFragranceResponse)
                .toList();


        return new PageResponse<>(
                fragranceResponses,
                fragrances.getNumber(),
                fragrances.getSize(),
                fragrances.getTotalElements(),
                fragrances.getTotalPages(),
                fragrances.isFirst(),
                fragrances.isLast());
    }

    public Integer updateDiscontinued(Integer fragranceId, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
        Fragrance fragrance = fragranceRepository.findById(fragranceId)
                .orElseThrow(() -> new EntityNotFoundException("Fragrance not found with the Id:: " + fragranceId));
        //if(!Objects.equals(fragrance.getAdder().getId(), user.getId())) {
        //    throw new OperationNotPermittedException("You are not allowed to update this fragrance");
        //}
        fragrance.setDiscontinued(!fragrance.getDiscontinued());
        fragranceRepository.save(fragrance);

        return fragranceId;

    }

    public void uploadFragrancePicture(MultipartFile file, Authentication connectedUser, Integer fragranceId) {

        Fragrance fragrance = fragranceRepository.findById(fragranceId)
                .orElseThrow(() -> new EntityNotFoundException("Fragrance not found with the Id:: " + fragranceId));

        User user = (User) connectedUser.getPrincipal();

        var fragrancePicture = fileStorageService.saveFile(file, fragranceId, user.getId());
        fragrance.setPicture(fragrancePicture);
        fragranceRepository.save(fragrance);
    }
}
