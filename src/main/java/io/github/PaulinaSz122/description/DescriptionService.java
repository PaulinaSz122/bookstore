package io.github.PaulinaSz122.description;

import org.springframework.stereotype.Service;

@Service
public class DescriptionService {
    private DescriptionRepository repository;

    public DescriptionService(DescriptionRepository repository) {
        this.repository = repository;
    }

    DescriptionDTO findByBookId(Integer bookId) {
        return new DescriptionDTO(repository
                .findDescriptionByBookId(bookId));
    }
}
