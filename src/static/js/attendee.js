class Attendee {
    name = "";
    path = "";
    constructor(name, path) {
        this.name = name;
        this.path = path;
    }
}

//add more attendees here
let galleryAttendees = [
    new Attendee("Clint Rutkas", "static/images/attendee-clint.jpg"),
    new Attendee("Den Delimarschi", "static/images/attendee-den.jpg"),
    new Attendee("Golnaz", "static/images/attendee-golnaz.jpg"),
    new Attendee("Royal Party", "static/images/attendee-royal-family.jpg"),
    new Attendee("Tracy Morgan", "static/images/attendee-tracy-morgan.jpg"),
    new Attendee("Barack Obama", "static/images/attendee-barack-obama.png"),
    new Attendee("John Krasinski", "static/images/attendee-john-krasinski.png")
];
