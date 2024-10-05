import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit,ElementRef, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/model/category.model';
import { Evento } from 'src/app/model/event.model';
import { FileHandle } from 'src/app/model/file-handle.model';
import { Institution } from 'src/app/model/institution.model';
import { CategoryService } from 'src/app/services/category.service';
import { EventService } from 'src/app/services/event.service';
import { InstitutionService } from 'src/app/services/institution.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-new-tournament',
  templateUrl: './add-new-tournament.component.html',
  styleUrls: ['./add-new-tournament.component.css']
})
export class AddNewTournamentComponent implements OnInit {


  // BRACKETS
  step: number = 1; // Controla los pasos
  selectedSize: number
  participants: string[] = []; // Almacena los participantes generados dinámicamente

  round1Matches = [];
  round2Matches = [];
  round3Matches = [];
  round4Matches = [];
  round5Matches = [];

  finals = [
    { player1: 'Finalist 1', player2: 'Finalist 2' }
  ];

  svgHeight: number;
  viewBoxHeight = 500; 
  //////////////////////////////////////////////////////////////////////////////////

  splitParticipantsSingleElimination: boolean = false; // Toggle para Single Elimination
  splitParticipantsDoubleElimination: boolean = false; // Toggle para Double Elimination

  showPlayersDropdown = false;


  dropdownOpen: boolean = false;
  selectedSportLabel: string = 'ELIGE EL DEPORTE';
  sportsList: string[] = ['Dota 2', 'League of Legends', 'VALORANT'];

  selectedButtons = {
    solo: false,
    duo: false,
    team: false
  };

  playersList = Array.from({ length: 30 }, (_, i) => i + 1);
  rostersList = Array.from({ length: 30 }, (_, i) => i + 1);
  numPlayers = 1;
  numRosters = 1;

  dropdowns = {
    players: false,
    rosters: false
  };


  //step: any = 1;
  selectedCategoriaIds: number[] = [];
  institutions: Institution[] = [];
  isNewEvento = true;
  categorias: Category[] = [];
  evento: Evento = {
    id: null,
    titulo: "",
    descripcion: "",
    fecha: "",
    hora: "", // Formato HH:mm
    direccion: "",
    direccionUrl: "",
    precioEntrada: 0,
    institucion: { id: null, nombre: "", imagenUrl: "", selected: false},
    categorias: [],
    organizador: null,
    eventoImagenes: []
  };

  tournamentFormats = [
    {
      key: 'singleElimination',
      title: 'Una sola Eliminación',
      description: 'El perdedor de cada partido será eliminado inmediatamente del torneo.',
      iconUrl: 'https://assets.challonge.com/assets/tournament_types/single_elimination.svg'
    },
    {
      key: 'doubleElimination',
      title: 'Doble Eliminación',
      description: 'Un participante es eliminado al perder dos juegos o partidos.',
      iconUrl: 'https://assets.challonge.com/assets/tournament_types/double_elimination.svg'
    },
    {
      key: 'roundRobin',
      title: 'Partido de ida y vuelta',
      description: 'Cada participante se reúne por turno con todos los demás participantes.',
      iconUrl: 'https://assets.challonge.com/assets/tournament_types/round_robin.svg'
    },
    {
      key: 'swiss',
      title: 'Swiss',
      description: 'Los participantes se emparejan para garantizar que cada competidor juegue contra oponentes con un puntaje similar, pero no contra el mismo oponente más de una vez.',
      iconUrl: 'https://assets.challonge.com/assets/tournament_types/swiss.svg'
    },
    {
      key: 'freeForAll',
      title: 'Free-for-all',
      description: 'Varios participantes se agrupan en un partido y los ganadores pasarán a la siguiente ronda.',
      iconUrl: 'https://assets.challonge.com/assets/tournament_types/free_for_all.svg'
    }
  ];

  selectedFormat: string | null = null;
  splitParticipants: boolean = false;
  //selectedSize: number | null = null;
  enteringSize: boolean = false;
  bracketSize: number = 0;

  // Variables para controlar el arrastre
  private isDragging = false;
  private startX: number;
  private startY: number;
  private translateX: number;
  private translateY: number;

  constructor(private eventService: EventService, private categoryService: CategoryService,
    private institutionService: InstitutionService, private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute, private router: Router, private elementRef: ElementRef) {
      
     }



  ngOnInit(): void {
    this.getCategory();
    this.getInstituciones();




  }

  addEvento(eventoForm: NgForm) {
    this.evento.categorias = this.selectedCategoriaIds.map(
      id => this.categorias.find(
        cat => cat.id === id
      )
    );

    const eventoFormData = this.prepareFormData(this.evento);

    this.eventService.save(eventoFormData).subscribe(
      (response: Evento) => {
        eventoForm.reset();
        this.evento.eventoImagenes = [];
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  next() {
    this.step = this.step + 1;
  }
  cancel(): void {

    this.router.navigate(['/selectInstitution']);
  }

  previus() {
    this.step = this.step - 1;
  }

  getInstituciones() {
    this.institutionService.getInstitution().subscribe(
      (response: Institution[]) => {
        this.institutions = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  getCategory() {
    this.categoryService.getCategory().subscribe(
      (response: Category[]) => {
        this.categorias = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  prepareFormData(evento: Evento): FormData {
    const formData = new FormData();

    formData.append(
      'evento', new Blob([JSON.stringify(evento)], { type: 'application/json' })
    );

    for (var i = 0; i < evento.eventoImagenes.length; i++) {
      formData.append(
        'imageFile',
        evento.eventoImagenes[i].file,
        evento.eventoImagenes[i].file.name
      );
    }

    return formData;
  }

  onFileSelected(event) {

    if (event.target.files) {

      const file = event.target.files[0];
      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }

      this.evento.eventoImagenes.push(fileHandle);
    }
  }

  removeImages(i: number) {
    this.evento.eventoImagenes.splice(i, 1);
  }

  fileDropped(fileHandle: FileHandle) {
    this.evento.eventoImagenes.push(fileHandle);
  }



  // Alterna la selección de botones, permitiendo solo uno seleccionado a la vez
  toggleButton(buttonKey: string) {
    Object.keys(this.selectedButtons).forEach(key => {
      this.selectedButtons[key] = false;
    });
    this.selectedButtons[buttonKey] = true;
  }



  playersDropdown(type: string) {
    // Alterna la visibilidad del dropdown seleccionado
    this.dropdowns[type] = !this.dropdowns[type];
  }


  // Función para seleccionar un jugador
  selectPlayer(player: number) {
    this.numPlayers = player;
    this.dropdowns['players'] = false; // Cierra el menú desplegable después de seleccionar
  }

  // Función para seleccionar un roster
  selectRoster(roster: number) {
    this.numRosters = roster;
    this.dropdowns['rosters'] = false; // Cierra el menú desplegable después de seleccionar
  }


  /*Funciones para el boton de Deportes*/

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }


  selectSport(sport: string) {
    this.selectedSportLabel = sport;
    this.dropdownOpen = false;
  }



  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    // Verifica si el clic está dentro del menú de jugadores
    const isClickInsidePlayers = target.closest('.players-wrapper') || target.closest('.players-items');

    // Verifica si el clic está dentro del menú de fichas
    const isClickInsideRosters = target.closest('.rosters-wrapper') || target.closest('.rosters-items');

    // Verifica si el clic está dentro del menú desplegable de deportes
    const isClickInsideSports = target.closest('.btn') || target.closest('.sportsMenu-dropdown');

    // Lógica para los dropdowns de jugadores y fichas
    if (!isClickInsidePlayers) {
      this.dropdowns['players'] = false;
    }

    if (!isClickInsideRosters) {
      this.dropdowns['rosters'] = false;
    }

    // Lógica para el dropdown de deportes
    if (!isClickInsideSports) {
      this.dropdownOpen = false;
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.elementRef.nativeElement.querySelector('#scrolleable-container').classList.add('-dragging');
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.translateX = this.elementRef.nativeElement.querySelector('#svg').style.transform ? parseFloat(this.elementRef.nativeElement.querySelector('#svg').style.transform.split(',')[0].replace('translateX(', '')) : 0;
    this.translateY = this.elementRef.nativeElement.querySelector('#svg').style.transform ? parseFloat(this.elementRef.nativeElement.querySelector('#svg').style.transform.split(',')[1].replace('translateY(', '')) : 0;
    
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      const newX = event.clientX;
      const newY = event.clientY;
      const dx = newX - this.startX;
      const dy = newY - this.startY;
      this.translateX += dx;
      this.translateY += dy;
      this.elementRef.nativeElement.querySelector('#svg').style.transform = `translateX(${this.translateX}px) translateY(${this.translateY}px)`;
      this.startX = newX;
      this.startY = newY;
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isDragging = false;
    this.elementRef.nativeElement.querySelector('#scrolleable-container').classList.remove('-dragging');
  }

  //BRACKETS
  selectFormat(formatKey: string) {
    this.selectedFormat = formatKey;
  }

  // Función para manejar la selección del tamaño del bracket en el Paso 5
  setBracketSize(size: number) {
    this.selectedSize = size;
    this.generateParticipants(size); // Genera participantes con el tamaño seleccionado
    this.generateBracket(size); // Genera los brackets según el tamaño seleccionado

    // Actualiza la altura de la viewBox según el tamaño seleccionado
  switch (size) {
    case 4:
      this.viewBoxHeight = 5;
      break;
    case 8:
      this.viewBoxHeight = 600;
      break;
    case 16:
      this.viewBoxHeight = 1100;
      break;
    case 32:
      this.viewBoxHeight = 2100;
      break;
    default:
      this.viewBoxHeight = 500;
      break;
  }

  }


  getWidth(): number {
    switch (this.selectedSize) {
      case 4:
        return 750;
      case 8:
        return 1200;
      case 16:
        return 1600;
      case 32:
        return 1900;
      default:
        return 400; // Valor por defecto
    }
  }






  toggleSplitParticipantsSingleElimination() {
    this.splitParticipantsSingleElimination = !this.splitParticipantsSingleElimination;
  }

  toggleSplitParticipantsDoubleElimination() {
    this.splitParticipantsDoubleElimination = !this.splitParticipantsDoubleElimination;
  }



  // BRACKETS


  // Función para generar los brackets en función de la cantidad de jugadores
  generateBracket(size: number) {
    // Reiniciar las rondas
    this.round1Matches = [];
    this.round2Matches = [];
    this.round3Matches = [];
    this.round4Matches = [];
    this.round5Matches = [];
    this.finals = [];

    let matchCounter = 1; // Contador para los números de los partidos

    // Generar la primera ronda de partidos
    for (let i = 0; i < size; i += 2) {
      const match = {
        player1: this.participants[i],
        player2: this.participants[i + 1] || 'BYE', // Si no hay un jugador, asignar 'BYE'
        matchNumber: matchCounter // Asignar el número del partido
      };
      this.round1Matches.push(match);
      matchCounter++; // Incrementar el contador de partidos
    }

    // Generar la segunda ronda
    if (size > 3) {
      for (let i = 0; i < this.round1Matches.length / 2; i++) {
        const match = {
          player1: `Ganador del Partido ${this.round1Matches[i * 2].matchNumber}`,
          player2: `Ganador del Partido ${this.round1Matches[(i * 2) + 1].matchNumber}`,
          matchNumber: matchCounter // Asignar el número del partido
        };
        this.round2Matches.push(match);
        matchCounter++; // Incrementar el contador de partidos
      }
    }

    // Generar la tercera ronda
    if (size > 4) {
      for (let i = 0; i < this.round2Matches.length / 2; i++) {
        const match = {
          player1: `Ganador del Partido ${this.round2Matches[i * 2].matchNumber}`,
          player2: `Ganador del Partido ${this.round2Matches[(i * 2) + 1].matchNumber}`,
          matchNumber: matchCounter // Asignar el número del partido
        };
        this.round3Matches.push(match);
        matchCounter++; // Incrementar el contador de partidos
      }
    }

    // Generar la cuarta ronda
    if (size > 8) {
      for (let i = 0; i < this.round3Matches.length / 2; i++) {
        const match = {
          player1: `Ganador del Partido ${this.round3Matches[i * 2].matchNumber}`,
          player2: `Ganador del Partido ${this.round3Matches[(i * 2) + 1].matchNumber}`,
          matchNumber: matchCounter // Asignar el número del partido
        };
        this.round4Matches.push(match);
        matchCounter++; // Incrementar el contador de partidos
      }
    }

    // Generar la quinta ronda
    if (size > 16) {
      for (let i = 0; i < this.round4Matches.length / 2; i++) {
        const match = {
          player1: `Ganador del Partido ${this.round4Matches[i * 2].matchNumber}`,
          player2: `Ganador del Partido ${this.round4Matches[(i * 2) + 1].matchNumber}`,
          matchNumber: matchCounter // Asignar el número del partido
        };
        this.round5Matches.push(match);
        matchCounter++; // Incrementar el contador de partidos
      }
    }

    // Actualizar la altura del SVG después de generar los partidos
    this.updateSvgHeight();
  }



  // Función para generar la lista de participantes según el tamaño del bracket
  generateParticipants(size: number) {
    this.participants = [];
    for (let i = 1; i <= size; i++) {
      this.participants.push(`Jugador ${i}`);
    }
  }


  // Esta función puede ser llamada cuando el usuario seleccione el número de jugadores
  onParticipantsChange(selection: number) {
    this.generateParticipants(selection);
  }



  updateSvgHeight() {
    const roundHeights = [
      this.round1Matches.length * 100, // 130px por partido
      this.round2Matches.length > 0 ? (this.round2Matches.length === 1 ? 130 : this.round2Matches.length * 220 + 62) : 0, // 260px por partido + padding
      this.round3Matches.length > 0 ? this.round3Matches.length * 250 + 104 : 0, // 390px por partido + padding
      this.round4Matches.length > 0 ? this.round4Matches.length * 225 + 76 : 0, // 520px por partido + padding
      this.round5Matches.length > 0 ? this.round5Matches.length * 135 + 46 : 0, // 650px por partido + padding
    ];
  
    const finalsHeight = this.finals.length > 0 ? 150 : 0; // Espacio reservado para la final
  
    // Establecer la altura total sumando la altura de todas las rondas
    const totalHeight = Math.max(...roundHeights) + finalsHeight + 100; // +100 de margen extra
  
    // Asignar la altura calculada al svg
    this.svgHeight = totalHeight;
  }



  updateNextRound(currentRoundMatches, nextRoundMatches) {
    nextRoundMatches.forEach((match, index) => {
      const previousMatch1 = currentRoundMatches[index * 2];     // Match par
      const previousMatch2 = currentRoundMatches[index * 2 + 1]; // Match impar

      // Lógica para determinar ganadores (esto puede ser dinámico según los resultados reales)
      match.player1 = this.getWinner(previousMatch1);
      match.player2 = this.getWinner(previousMatch2);
    });
  }


  getWinner(match) {
    // Ejemplo estático de ganador basado en una condición (puede ser dinámico según resultados)
    return match.score1 > match.score2 ? match.player1 : match.player2;
  }


  getPosicionGanador(): string {
    let xPos: number;
    let yPos: number;

    // Cálculo de la posición horizontal en función del tamaño seleccionado
    switch (this.selectedSize) {
      case 4:
        xPos = 590;
        yPos = 71; // Valor dinámico para el eje Y
        break;
      case 8:
        xPos = 870;
        yPos = 201; // Valor dinámico para el eje Y
        break;
      case 16:
        xPos = 1160;
        yPos = 462; // Valor dinámico para el eje Y
        break;
      case 32:
        xPos = 1450;
        yPos = 983; // Valor dinámico para el eje Y
        break;
      default:
        xPos = 0;  // Valor por defecto si no se selecciona un tamaño válido
        yPos = 0;  // Valor por defecto para el eje Y
    }

    // Retornar la posición en formato `translate(x, y)`
    return `${xPos}, ${yPos}`;
  }

 



}
