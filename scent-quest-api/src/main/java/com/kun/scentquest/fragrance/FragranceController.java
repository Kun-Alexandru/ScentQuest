package com.kun.scentquest.fragrance;


import com.kun.scentquest.common.PageResponse;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("fragrances")
@RequiredArgsConstructor
@Tag(name = "fragrance", description = "The fragrance API")
public class FragranceController {

    private final FragranceService fragranceService;

    @PostMapping
    public ResponseEntity<Integer> saveFragrance(
            @Valid @RequestBody FragranceRequest request,
            Authentication connectedUser
            ) {
        return ResponseEntity.ok(fragranceService.save(request, connectedUser));
    }

    @GetMapping("{fragrance-id}")
    public ResponseEntity<FragranceResponse> findFragranceById(
            @PathVariable("fragrance-id") Integer fragranceId
    ) {
        return ResponseEntity.ok(fragranceService.findById(fragranceId));
    }

    @GetMapping
    public ResponseEntity<PageResponse<FragranceResponse>> findAllFragrances(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(fragranceService.findAllFragrances(page, size, connectedUser));
    }

    @GetMapping("/owner")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<PageResponse<FragranceResponse>> findAllFragrancesByOwner(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(fragranceService.findAllFragrancesByOwner(page, size, connectedUser));
    }

    @GetMapping("/{fragrance-note}/notes")
    public ResponseEntity<PageResponse<FragranceResponse>> findAllFragrancesByNote(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser,
            @PathVariable("fragrance-note") String fragranceNote
    ) {
        return ResponseEntity.ok(fragranceService.findAllFragrancesByNote(page, size, connectedUser, fragranceNote));
    }

    @GetMapping("/{fragrance-perfumer-id}/perfumers")
    public ResponseEntity<PageResponse<FragranceResponse>> findAllFragrancesByPerfumer(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser,
            @PathVariable("fragrance-perfumer-id") Integer perfumerId
    ) {
        return ResponseEntity.ok(fragranceService.findAllFragrancesByPerfumer(page, size, connectedUser, perfumerId));
    }

    @PatchMapping("/discontinued/{fragrance-id}")
    public ResponseEntity<Integer> updateDiscontinued(
            @PathVariable("fragrance-id") Integer fragranceId,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(fragranceService.updateDiscontinued(fragranceId, connectedUser));
    }

    @PostMapping(value = "/picture/{fragrance-id}", consumes = "multipart/form-data")
    public ResponseEntity<?> uploadFragrancePicture(
            @PathVariable("fragrance-id") Integer fragranceId,
            @Parameter()
            @RequestPart("file") MultipartFile file,
            Authentication connectedUser
    ) {
        fragranceService.uploadFragrancePicture(file, connectedUser, fragranceId);
        return ResponseEntity.accepted().build();
    }




}
