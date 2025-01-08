import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})
export class IndexPageComponent implements OnInit {
  login:boolean = false;
  etudiantlogin:boolean = false;
  videoStarted: boolean = false;  
  showImage: boolean = true; // Variable to control the image display
  showVideo: boolean = false;
  ngOnInit(): void {
    // Set a timeout to switch from image to video
      // Delay of 5 seconds
  }
  startVideo() {
    this.videoStarted = true;  // Afficher la vidéo et masquer l'image
  }
  navigateToAbout() {
  
  }
  constructor(
    private router: Router
  ) { }
  handleConnected() {
    this.etudiantlogin=false;
    this.login = true;
  }


etudintLogin() {
  this.login = false;
  this.etudiantlogin=true;
}

}
