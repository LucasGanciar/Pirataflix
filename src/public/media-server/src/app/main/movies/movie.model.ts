export class Movie {
    public name: string;
    public path: string;
    public description: string;
    public imagePath: string;
  
    constructor(name: string, path: string, desc: string, imagePath: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRuqNs-Tf_FBolJh6e7uZgphxgoDCPWCwtiCA&usqp=CAU') {
      this.name = name;
      this.description = desc;
      this.imagePath = imagePath;
    }
  }
  