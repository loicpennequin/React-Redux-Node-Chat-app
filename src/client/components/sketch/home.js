export default function sketch(p) {
    const CANVAS_WIDTH = window.innerWidth;
    const CANVAS_HEIGHT = window.innerHeight;
    const POINT_MINSPEED = 3;
    const POINT_MAXSPEED = 7;
    const POINT_MINFORCE = 0.5;
    const POINT_MAXFORCE = 1;
    const POINT_SPAWN_INTERVAL = 500;
    const MAX_POINTS = 35;

    const points = [];

    function Point(x, y, speed, force) {
        this.pos = p.createVector(x, y);
        this.vel = p.createVector(0, 0);
        this.maxSpeed = speed;
        this.maxRepelSpeed = speed * 2.5;
        this.maxForce = force;
        this.repelled = false;

        this.update = () => {
            if (!this.repelled) {
                const target = p.createVector(p.mouseX, p.mouseY);
                const desire = target.sub(this.pos);
                const steer = desire.sub(this.vel);
                steer.limit(this.maxForce);
                this.vel.add(steer);
                this.vel.setMag(this.maxSpeed);
            } else {
                this.vel.setMag(this.maxRepelSpeed);
            }
            this.pos.add(this.vel);
        };

        this.repel = () => {
            const target = p.createVector(p.mouseX, p.mouseY);
            const desire = target.sub(this.pos);
            this.vel = desire.mult(-1);
            this.repelled = true;
            setTimeout(() => {
                this.repelled = false;
            }, 1000);
        };

        this.render = () => {
            p.stroke(255, 255, 255, 125);
            p.strokeWeight(8);
            p.point(this.pos.x, this.pos.y);
        };
    }

    function addPoint() {
        points.push(
            new Point(
                Math.round(Math.random() * CANVAS_WIDTH),
                Math.round(Math.random() * CANVAS_HEIGHT),
                Math.round(POINT_MINSPEED + Math.random() * POINT_MAXSPEED),
                Math.round(POINT_MINFORCE + Math.random() * POINT_MAXFORCE)
            )
        );
    }

    const spawner = setInterval(addPoint, POINT_SPAWN_INTERVAL);

    p.mouseClicked = () => {
        points.forEach(p => {
            p.repel();
        });
    };

    p.setup = function() {
        p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    };

    p.draw = function() {
        p.clear();
        if (points.length > MAX_POINTS) {
            clearInterval(spawner);
        }
        points.forEach((point, i) => {
            point.update();
            point.render();
        });
    };
}
