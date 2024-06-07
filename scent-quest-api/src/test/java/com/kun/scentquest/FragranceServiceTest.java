package com.kun.scentquest;

import static org.mockito.Mockito.*;

import com.kun.scentquest.common.PageResponse;
import com.kun.scentquest.exception.OperationNotPermittedException;
import com.kun.scentquest.feedback.review.ReviewRepository;
import com.kun.scentquest.file.FileStorageService;
import com.kun.scentquest.fragrance.favorite.FavouriteRepository;
import com.kun.scentquest.fragrance.fragrance.*;
import com.kun.scentquest.fragrance.note.NoteMapper;
import com.kun.scentquest.fragrance.note.NoteRepository;
import com.kun.scentquest.fragrance.owned.OwnedRepository;
import com.kun.scentquest.fragrance.perfumer.PerfumerMapper;
import com.kun.scentquest.fragrance.perfumer.PerfumerRepository;
import com.kun.scentquest.users.role.User;
import com.kun.scentquest.users.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.*;
import org.springframework.security.core.Authentication;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@SpringBootTest
public class FragranceServiceTest {

    @Mock
    private FragranceMapper fragranceMapper;

    @Mock
    private NoteMapper noteMapper;

    @Mock
    private FragranceRepository fragranceRepository;

    @Mock
    private FileStorageService fileStorageService;

    @Mock
    private FavouriteRepository favouriteRepository;

    @Mock
    private NoteRepository noteRepository;

    @Mock
    private PerfumerRepository perfumerRepository;

    @Mock
    private PerfumerMapper perfumerMapper;

    @Mock
    private ReviewRepository reviewRepository;

    @Mock
    private OwnedRepository ownedRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private FragranceService fragranceService;

    @BeforeEach
    void setUp() {
    }

    @Test
    void testSaveFragrance() {
        FragranceRequest request = new FragranceRequest(1, "ok", "brand", "season", "nice", false, LocalDate.MIN, 0, "EDP","male",0);
        Authentication connectedUser = mock(Authentication.class);

        List<Integer> noteIds = new ArrayList<>();

        List<Integer> perfumerIds = new ArrayList<>();

        Fragrance fragrance = new Fragrance();
        fragrance.setFragranceId(1);
        when(fragranceMapper.toFragrance(request)).thenReturn(fragrance);

        when(fragranceRepository.save(fragrance)).thenReturn(fragrance);

        Integer result = fragranceService.save(request, connectedUser, noteIds, perfumerIds);

        verify(fragranceRepository, times(1)).save(fragrance);
        assert(result.equals(fragrance.getFragranceId()));
    }

    @Test
    void testFindFragranceById() {
        FragranceResponse fragranceResponse = new FragranceResponse();
        Integer fragranceId = 1;

        Fragrance fragrance = new Fragrance();
        when(fragranceRepository.findById(fragranceId)).thenReturn(Optional.of(fragrance));
        when(fragranceMapper.toFragranceResponse(fragrance)).thenReturn(fragranceResponse);

        FragranceResponse result = fragranceService.findById(fragranceId);

        assert(result.equals(fragranceResponse));
    }

    @Test
    void testUpdateFragrance() {
        FragranceRequest request = new FragranceRequest(1, "ok", "brand", "season", "nice", false, LocalDate.MIN, 0, "EDP","male",0);

        List<Integer> noteIds = new ArrayList<>();
        List<Integer> perfumerIds = new ArrayList<>();

        Authentication connectedUser = mock(Authentication.class);
        User user = new User();
        when(connectedUser.getPrincipal()).thenReturn(user);

        Fragrance fragrance = new Fragrance();
        fragrance.setFragranceId(1);
        when(fragranceRepository.findById(request.FragranceId())).thenReturn(Optional.of(fragrance));
        when(fragranceRepository.save(fragrance)).thenReturn(fragrance);

        // Call the service method
        Integer result = fragranceService.updateFragrance(connectedUser, request, noteIds, perfumerIds);

        // Verify that the correct fragrance ID was returned
        assert(result.equals(fragrance.getFragranceId()));
    }

    @Test
    void testUpdateDiscontinued() {
        Integer fragranceId = 1;

        Authentication connectedUser = mock(Authentication.class);
        User user = new User();
        when(connectedUser.getPrincipal()).thenReturn(user);

        Fragrance fragrance = new Fragrance();
        fragrance.setFragranceId(fragranceId);
        when(fragranceRepository.findById(fragranceId)).thenReturn(Optional.of(fragrance));
        when(fragranceRepository.save(fragrance)).thenReturn(fragrance);

        Integer result = fragranceService.updateDiscontinued(fragranceId, connectedUser);

        assert(result.equals(fragranceId));
    }

    @Test
    void testFindAllFragrances() {
        int page = 0;
        int size = 10;
        String season = "Summer";
        String searchWord = "fragrance";

        Pageable pageable = PageRequest.of(page, size, Sort.by("name").ascending());
        List<Fragrance> fragrancesList = new ArrayList<>();
        Page<Fragrance> fragrancesPage = new PageImpl<>(fragrancesList);
        when(fragranceRepository.findAllFragrancesBySearchWord(searchWord, season, pageable)).thenReturn(fragrancesPage);

        PageResponse<FragranceResponse> result = fragranceService.findAllFragrances(page, size, season, searchWord);

        assert(result.getNumber() == page);
    }

}
