package com.kun.scentquest.fragrance.Fragrance;

import com.kun.scentquest.common.PageResponse;
import com.kun.scentquest.exception.OperationNotPermittedException;
import com.kun.scentquest.feedback.ReviewRepository;
import com.kun.scentquest.file.FileStorageService;
import com.kun.scentquest.fragrance.Favorite.Favourite;
import com.kun.scentquest.fragrance.Favorite.FavouriteRepository;
import com.kun.scentquest.fragrance.Note.Note;
import com.kun.scentquest.fragrance.Note.NoteMapper;
import com.kun.scentquest.fragrance.Note.NoteRepository;
import com.kun.scentquest.fragrance.Note.NoteResponse;
import com.kun.scentquest.fragrance.Perfumer.Perfumer;
import com.kun.scentquest.fragrance.Perfumer.PerfumerMapper;
import com.kun.scentquest.fragrance.Perfumer.PerfumerRepository;
import com.kun.scentquest.fragrance.Perfumer.PerfumerResponse;
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

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class FragranceService {

    private final FragranceMapper fragranceMapper;
    private final NoteMapper noteMapper;
    private final FragranceRepository fragranceRepository;
    private final FileStorageService fileStorageService;
    private final FavouriteRepository favouriteRepository;
    private final NoteRepository noteRepository;
    private final PerfumerRepository perfumerRepository;
    private final PerfumerMapper perfumerMapper;
    private final ReviewRepository reviewRepository;

    public Integer save(FragranceRequest request, Authentication connectedUser, List<Integer> noteIds, List<Integer> perfumerIds) {
        User user = (User) connectedUser.getPrincipal();
        Fragrance fragrance = fragranceMapper.toFragrance(request);
        fragrance.setAdder(user);
        List<Note> notes = noteRepository.findAllById(noteIds);
        fragrance.setNotes(notes);
        List<Perfumer> perfumers = perfumerRepository.findAllById(perfumerIds);
        fragrance.setPerfumers(perfumers);
        return fragranceRepository.save(fragrance).getFragranceId();
    }


    public FragranceResponse findById(Integer fragranceId) {
        return fragranceRepository.findById(fragranceId)
                .map(fragranceMapper::toFragranceResponse)
                .orElseThrow(() -> new RuntimeException("Fragrance not found"));
    }


    public PageResponse<FragranceResponse> findAllFragrances(int page, int size) {
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

    public Integer updateFragrance(Authentication connectedUser, FragranceRequest request, List<Integer> noteIds, List<Integer> perfumerIds) {
        User user = (User) connectedUser.getPrincipal();
        Fragrance fragrance = fragranceRepository.findById(request.FragranceId())
                .orElseThrow(() -> new EntityNotFoundException("Fragrance not found with the Id:: " + request.FragranceId()));

        List<Note> notes = noteRepository.findAllById(noteIds);
        List<Perfumer> perfumers = perfumerRepository.findAllById(perfumerIds);

        fragrance.setBrand(request.brand());
        fragrance.setName(request.name());
        fragrance.setRecommendedSeason(request.recommendedSeason());
        fragrance.setShortDescription(request.shortDescription());
        fragrance.setGender(request.gender());
        fragrance.setConcentration(request.concentration());
        fragrance.setDiscontinued(request.discontinued());
        fragrance.setReleaseDate(request.releaseDate());
        fragrance.setPerfumers(perfumers);
        fragrance.setNotes(notes);
        fragranceRepository.save(fragrance);
        return fragrance.getFragranceId();
    }

    public void uploadFragrancePicture(MultipartFile file, Authentication connectedUser, Integer fragranceId) {

        Fragrance fragrance = fragranceRepository.findById(fragranceId)
                .orElseThrow(() -> new EntityNotFoundException("Fragrance not found with the Id:: " + fragranceId));

        User user = (User) connectedUser.getPrincipal();

        var fragrancePicture = fileStorageService.saveFile(file, fragranceId, user.getId());
        fragrance.setPicture(fragrancePicture);
        fragranceRepository.save(fragrance);
    }

    public Integer save(Integer fragranceId, Authentication connectedUser) {
        Fragrance fragrance = fragranceRepository.findById(fragranceId)
                .orElseThrow(() -> new EntityNotFoundException("No fragrance found with ID:: " + fragranceId));

        User user = ((User) connectedUser.getPrincipal());

        final boolean isAlreadyFavourite = favouriteRepository.isAlreadyFavourite(fragranceId, user.getId());
        if(isAlreadyFavourite) {
            throw new OperationNotPermittedException("Fragrance is already in your favourites");
        }

        Favourite favourite = Favourite.builder()
                .fragrance(fragrance)
                .user(user)
                .build();
        return favouriteRepository.save(favourite).getId();
    }

    public Integer delete(Integer fragranceId, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        final boolean isAlreadyFavourite = favouriteRepository.isAlreadyFavourite(fragranceId, user.getId());
        if(!isAlreadyFavourite) {
            throw new OperationNotPermittedException("Fragrance is not in your favourites");
        }
        Favourite favourite = favouriteRepository.findAllByFragranceIdAndUserId(fragranceId, user.getId())
                .orElseThrow(() -> new EntityNotFoundException("No favourite found with fragrance ID:: " + fragranceId));
        favouriteRepository.delete(favourite);
        return 1;
    }

    public List<Integer> findAllFavouritesByUserId(Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        List<Favourite> favourites = favouriteRepository.findAllByUserId(user.getId());
        if(favourites.isEmpty()) {
            return Collections.emptyList();
        }
        else
            return favourites.stream()
                .map(Favourite::getFragrance)
                .map(Fragrance::getFragranceId)
                .collect(Collectors.toList());
    }

    public Integer findAllFavouritesByUserIdAndFragranceId(Authentication connectedUser, Integer fragranceId) {
        User user = ((User) connectedUser.getPrincipal());
        return favouriteRepository.findAllByFragranceIdAndUserId(fragranceId, user.getId())
                .map(Favourite::getId)
                .orElseThrow(() -> new EntityNotFoundException("No favourite found with user ID:: " + user.getId()));
    }

    public PageResponse<FragranceResponse> findAllFavoritedFragrancesByOwner(int page, int size, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
        Pageable pageable = PageRequest.of(page, size);
        Page<Fragrance> fragrances = favouriteRepository.findAllFavoriteFragrancesByUserId(pageable, user.getId());
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


    public List<NoteResponse> getNotesByFragranceId(Integer fragranceId) {
        List<Note> notes = noteRepository.findAllNotesByFragranceId(fragranceId);
        return notes.stream()
                .map(noteMapper::toNoteResponse)
                .collect(Collectors.toList());
    }

    public List<NoteResponse> getAllNotes(){
        List<Note> notes =  noteRepository.getAll();
        return notes.stream()
                .map(noteMapper::toNoteResponse)
                .collect(Collectors.toList());
    }

    public List<PerfumerResponse> getAllPerfumers(){
        List<Perfumer> perfumers = perfumerRepository.getAll();
        return perfumers.stream()
                .map(perfumerMapper::toPerfumerResponse)
                .collect(Collectors.toList());
    }

    public List<PerfumerResponse> getPerfumersByFragranceId(Integer fragranceId){
        List<Perfumer> perfumers = perfumerRepository.findPerfumersByFragranceId(fragranceId);
        return perfumers.stream()
                .map(perfumerMapper::toPerfumerResponse)
                .collect(Collectors.toList());
    }

    public Integer deleteFragrance(Integer fragranceId) {
        if (fragranceRepository.existsById(fragranceId)) {
            Optional<Fragrance> f = fragranceRepository.findById(fragranceId);
            if(f.isPresent()) {
                Fragrance fragrance = f.get();
                int id = fragrance.getFragranceId();
                fragrance.setReviews(new ArrayList<>());
                fragrance.setNotes(new ArrayList<>());
                fragrance.setPerfumers(new ArrayList<>());
                fragranceRepository.save(fragrance);
            }
            fragranceRepository.deleteById(fragranceId);
            return fragranceId;
        } else {
            throw new EntityNotFoundException("Fragrance not found with the Id:: " + fragranceId);
        }
    }

    public void addNotesToFragrance(Integer fragranceId, List<Integer> noteIds) {
        Optional<Fragrance> optionalFragrance = fragranceRepository.findById(fragranceId);
        if (optionalFragrance.isPresent()) {
            Fragrance fragrance = optionalFragrance.get();

            List<Note> notes = noteRepository.findAllById(noteIds);
            fragrance.setNotes(notes);

            fragranceRepository.save(fragrance);
        } else {
            throw new IllegalArgumentException("Fragrance not found with ID: " + fragranceId);
        }
    }


    public void updateNotesInFragrance(Integer fragranceId, List<Integer> noteIds) {
        Optional<Fragrance> optionalFragrance = fragranceRepository.findById(fragranceId);
        if (optionalFragrance.isPresent()) {
            Fragrance fragrance = optionalFragrance.get();

            List<Note> newNotes = noteRepository.findAllById(noteIds);
            fragrance.setNotes(newNotes);

            fragranceRepository.save(fragrance);
        } else {
            throw new IllegalArgumentException("Fragrance not found with ID: " + fragranceId);
        }
    }

}
