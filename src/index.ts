class HelloWorld {
  private name: string
  constructor(name: string) {
    this.name = name
  }
  public greet = () => console.log(this.name)
}

const c = new HelloWorld("Mike");
c.greet();
