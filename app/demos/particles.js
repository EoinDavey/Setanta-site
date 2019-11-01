function randRange(l, r) {
    return Math.floor(Math.random() * Math.abs(r - l)) + l;
}

class Bouncer extends G.Agent {
    constructor(initX, initY, initDx, initDy){
        super(initX, initY, "red");
        this.dx = initDx;
        this.dy = initDy;
    }
    async release() {
        if(!this.stage)
            return;
        await forever(20, () => {
            if(this.stage.blocked(this.posX + this.dx, this.posY + this.dy)) {
                this.dx *= -1;
                this.dy *= -1;
            } else if(this.stage.blocked(this.posX + this.dx, this.posY)) {
                this.dx *= -1; 
            } else if(this.stage.blocked(this.posX, this.posY + this.dy)) {
                this.dy *= -1;
            }
            if(!this.stage.blocked(this.posX + this.dx, this.posY + this.dy))
            	this.moveTo([this.posX + this.dx, this.posY + this.dy]);
        });
    }
}

async function main() {
    const g = new G.GridStage();
    display.setStage(g);
    
    const szX = Math.floor(display.sizeX / g.agentSize);
    const szY = Math.floor(display.sizeY / g.agentSize);
    
    for(let i = 0; i < szX; i++){
    	g.attach(new G.Agent(i, szY - 1, "green"));
        g.attach(new G.Agent(i, 0, "green"));
    }
    for(let i = 1; i < szY-1; i++){
        g.attach(new G.Agent(0, i, "green"));
        g.attach(new G.Agent(szX-1, i, "green"));
    }
    
    for(let i = 0; i < 100; i++){
        const x = randRange(1, szX - 1);
        const y = randRange(1, szY - 1);
        const dx = randRange(-1, 2);
        const dy = randRange(-1, 2);
        const ball = new Bouncer(x, y, dx, dy);
        g.attach(ball);
        ball.release();
    }
}
main();
