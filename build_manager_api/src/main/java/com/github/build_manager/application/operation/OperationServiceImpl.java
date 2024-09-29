package com.github.build_manager.application.operation;

import com.github.build_manager.domain.entity.Operation;
import com.github.build_manager.domain.service.OperationService;
import com.github.build_manager.infra.repository.OperationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class OperationServiceImpl implements OperationService {

    private final OperationRepository operationRepository;

    @Override
    @Transactional
    public Operation save(Operation operation) {
        return operationRepository.save((operation));
    }
}
