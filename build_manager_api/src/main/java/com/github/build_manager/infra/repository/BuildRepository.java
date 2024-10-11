package com.github.build_manager.infra.repository;

import com.github.build_manager.domain.entity.Build;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.util.StringUtils;

import java.util.List;

public interface BuildRepository extends JpaRepository<Build, String>, JpaSpecificationExecutor<Build> {

    public default List<Build> findByNameLike(String query) {
        // Criação da especificação inicial
        Specification<Build> spec = Specification.where(null);

        if (StringUtils.hasText(query)) {
            // AND NAME LIKE '%QUERY%'
            spec = spec.and((root, queryCriteria, builder) ->
                    builder.like(builder.lower(root.get("name")), "%" + query.toLowerCase() + "%")
            );
        }

        return findAll(spec);
    }

}
