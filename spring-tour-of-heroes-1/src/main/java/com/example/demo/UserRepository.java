package com.example.demo;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "login", path = "login")
public interface UserRepository extends PagingAndSortingRepository<User, Long>{
	User findByUsernameAndPassword(@Param("username") String name, @Param("password") String pass);
}
