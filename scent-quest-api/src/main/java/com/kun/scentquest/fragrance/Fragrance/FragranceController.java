package com.kun.scentquest.fragrance.Fragrance;


import com.kun.scentquest.common.PageResponse;
import com.kun.scentquest.fragrance.Note.NoteResponse;
import com.kun.scentquest.fragrance.Perfumer.PerfumerResponse;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

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
            @RequestParam(name = "size", defaultValue = "10", required = false) int size
    ) {
        return ResponseEntity.ok(fragranceService.findAllFragrances(page, size));
    }

    @GetMapping("/owner")
    public ResponseEntity<PageResponse<FragranceResponse>> findAllFragrancesByOwner(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(fragranceService.findAllFragrancesByOwner(page, size, connectedUser));
    }

    /*
    @GetMapping("/{fragrance-note}/notes")
    public ResponseEntity<PageResponse<FragranceResponse>> findAllFragrancesByNote(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser,
            @PathVariable("fragrance-note") String fragranceNote
    ) {
        return ResponseEntity.ok(fragranceService.findAllFragrancesByNote(page, size, connectedUser, fragranceNote));
    }*/

    /*
    @GetMapping("/{fragrance-perfumer-id}/perfumers")
    public ResponseEntity<PageResponse<FragranceResponse>> findAllFragrancesByPerfumer(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser,
            @PathVariable("fragrance-perfumer-id") Integer perfumerId
    ) {
        return ResponseEntity.ok(fragranceService.findAllFragrancesByPerfumer(page, size, connectedUser, perfumerId));
    }*/

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

    @PostMapping("/favourite")
    public ResponseEntity<Integer> saveFavourite(
            @RequestParam("fragrance-id") Integer fragranceId,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(fragranceService.save(fragranceId, connectedUser));
    }


    @DeleteMapping("/favourite")
    public ResponseEntity<Integer> deleteFavourite(
            @RequestParam("fragrance-id") Integer fragranceId,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(fragranceService.delete(fragranceId, connectedUser));
    }

    @GetMapping("/favourite")
    public List<Integer> findAllFavouritesByUserId(
            Authentication connectedUser
    ) {
        return fragranceService.findAllFavouritesByUserId(connectedUser);
    }

    @GetMapping("/favourite/{fragrance-id}")
    public ResponseEntity<Integer> findFavouriteByUserIdAndFragranceId(
            @RequestParam("fragrance-id") Integer fragranceId,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(fragranceService.findAllFavouritesByUserIdAndFragranceId(connectedUser, fragranceId));
    }

    @GetMapping("/favourite/owner")
    public ResponseEntity<PageResponse<FragranceResponse>> findAllFavoritedFragrancesByOwner(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(fragranceService.findAllFavoritedFragrancesByOwner(page, size, connectedUser));
    }

    @GetMapping("/{fragrance-id}/notes")
    public ResponseEntity<List<NoteResponse>> findAllNotesByFragranceId(
            @PathVariable("fragrance-id") Integer fragranceId
    ) {
        return ResponseEntity.ok(fragranceService.getNotesByFragranceId(fragranceId));
    }

    @GetMapping("/notes")
    public ResponseEntity<List<NoteResponse>> getAllNotes() {
        return ResponseEntity.ok(fragranceService.getAllNotes());
    }

    @GetMapping("/perfumers")
    public ResponseEntity<List<PerfumerResponse>> getAllPerfumers() {
        return ResponseEntity.ok(fragranceService.getAllPerfumers());
    }

    @GetMapping("/{fragrance-id}/perfumers")
    public ResponseEntity<List<PerfumerResponse>> findPerfumersByFragranceId(
            @PathVariable("fragrance-id") Integer fragranceId
    ) {
        return ResponseEntity.ok(fragranceService.getPerfumersByFragranceId(fragranceId));
    }

    @DeleteMapping("/{fragrance-id}")
    public ResponseEntity<Integer> deleteFragrance(
            @PathVariable("fragrance-id") Integer fragranceId
    ) {
        return ResponseEntity.ok(fragranceService.deleteFragrance(fragranceId));
    }

}
