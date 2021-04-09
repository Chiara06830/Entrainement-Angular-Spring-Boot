/**
 * 
 */
package com.example.demo;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class HeroController {
	@Autowired
	private HeroRepository heroRepo;

	@GetMapping("/heroes")
	public List<Hero> findHeroes(@RequestParam(value = "name", defaultValue = "") String name) {
		return name.isEmpty() ? heroRepo.findAll() : heroRepo.findByName(name);
	}
	
	@GetMapping("/heroes/{id}")
	public Optional<Hero> findHero(@PathVariable long id) {
		return heroRepo.findById(id);
	}
	
	@GetMapping("heroes/?name={name}")
	public List<Hero> searchHero(@PathVariable String name){
		/*List<Hero> list = heroRepo.findAll();
		List<Hero> res = new ArrayList<Hero>();
		for(Hero element : list) {
			if(element.getName().contains(name)) {
				res.add(element);
			}
		}
		return res;*/
		return heroRepo.findByName(name);
	}
	
	@PostMapping("/heroes")
	public Hero addHero(@RequestBody Hero hero) {
		return heroRepo.save(hero);
	}
	
	@DeleteMapping("/heroes/{id}")
	public void deleteHero(@PathVariable long id) {
		heroRepo.deleteById(id);
	}
	
	@PutMapping("/heroes")
	public Hero updateHero(@RequestBody Hero hero) {
		return heroRepo.save(hero);
	}
}