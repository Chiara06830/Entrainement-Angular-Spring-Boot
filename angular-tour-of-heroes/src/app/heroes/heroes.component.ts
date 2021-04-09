import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from '../_models/hero';
import { User } from '../_models/user';
import { HeroService } from '../_services/hero.service';
import { LoginService } from '../_services/login.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  user : User;

  constructor(
    private heroService: HeroService,
    private router: Router,
    private loginService : LoginService) {
      this.loginService.currentUser.subscribe(x => this.user = x);
    }

  ngOnInit() {
    this.getHeroes();
    if(this.user.profile === 'reader'){
      this.router.navigate(['/dashboard']);
    }
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
