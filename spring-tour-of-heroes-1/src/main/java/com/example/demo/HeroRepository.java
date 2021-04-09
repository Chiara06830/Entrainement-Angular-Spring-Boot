package com.example.demo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface HeroRepository extends JpaRepository<Hero, Long>{
	List<Hero> findByName(@Param("name") String name);
}
