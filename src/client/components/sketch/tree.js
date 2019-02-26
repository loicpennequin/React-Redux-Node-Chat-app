let p5;
if (typeof window !== 'undefined') {
    p5 = require('p5');
}

export default function tree(p) {
    const CANVAS_WIDTH = window.innerWidth;
    const CANVAS_HEIGHT = window.innerHeight;
    const BRANCH_MAX_SIZE = 150;
    const BRANCH_MIN_SIZE = 30;
    const BRANCH_SCALE_RATIO = 0.85;
    const BRANCH_CHILD_ANGLE = 25;
    const MAX_SIZE_INCREMENT = 15;
    let currentSizeIncrement = 3;

    const createBranch = (start, end, maxSize = BRANCH_MAX_SIZE) => ({
        start,
        end,
        size: 0,
        children: [],
        update() {
            if (this.size < maxSize) {
                this.size += currentSizeIncrement;
            } else if (this.children.length <= 0 && maxSize > BRANCH_MIN_SIZE) {
                this.spawn(BRANCH_CHILD_ANGLE);
                this.spawn(-BRANCH_CHILD_ANGLE);
            }
        },
        spawn(angle) {
            const childDir = p5.Vector.sub(this.end, this.start);
            childDir.setMag(maxSize * BRANCH_SCALE_RATIO);
            childDir.rotate(angle);
            const childEnd = p5.Vector.add(this.end, childDir);
            this.children.push(
                createBranch(this.end, childEnd, maxSize * BRANCH_SCALE_RATIO)
            );
        },
        render() {
            this.update();
            const lineVector = p5.Vector.sub(this.end, this.start);
            lineVector.setMag(this.size);
            const weight = p.map(maxSize, 0, BRANCH_MAX_SIZE, 1, 5);
            const opacity = p.map(
                maxSize,
                BRANCH_MIN_SIZE,
                BRANCH_MAX_SIZE,
                0,
                100
            );
            const saturation = p.map(
                maxSize,
                BRANCH_MIN_SIZE,
                BRANCH_MAX_SIZE,
                100,
                0
            );
            p.strokeWeight(weight);
            p.stroke(180, saturation, 100, opacity);
            p.line(
                this.start.x,
                this.start.y,
                this.start.x + lineVector.x,
                this.start.y + lineVector.y
            );

            if (this.children.length > 0) {
                this.children.forEach(child => {
                    child.render();
                });
            }
        }
    });

    const tree = {};

    p.setup = function() {
        p.angleMode(p.DEGREES);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
        tree.root = createBranch(
            p.createVector(0, 0),
            p.createVector(0, -BRANCH_MAX_SIZE)
        );
    };

    p.draw = function() {
        p.clear();
        p.translate(0, p.height);
        p.rotate(30);
        tree.root.render();
    };
}
