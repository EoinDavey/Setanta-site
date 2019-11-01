class Controllable extends G.Agent {
    keyboard(code){
        if(code == "ArrowUp")
            this.moveUp();
        if(code == "ArrowDown")
            this.moveDown();
        if(code == "ArrowLeft")
            this.moveLeft();
        if(code == "ArrowRight")
            this.moveRight();
    }
}

async function main() {
    const g = new G.GridStage();
    display.setStage(g);
 	
    const ag = new Controllable(0, 0, "red");
    g.attach(ag);
    display.registerKeyHandler(code => ag.keyboard(code));
}
main();
