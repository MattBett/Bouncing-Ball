window.addEventListener(
  "load",
  function() {
    var objs = document.getElementsByTagName("canvas");
    var canva = objs[0];

    var ball = {
      size: 20,
      speedMax: 5,

      aX: 0,
      aY: 0,
      speedX: 0,
      speedY: 0,
      x: 10,
      y: 10,

      g: -0.981,
      resultante: 0,

      init() {
        this.x = Math.floor(
          Math.random() * (canva.width - this.size + 1) + this.size
        );
        this.y = Math.floor(
          Math.random() * (canva.height - this.size + 1) + this.size
        );

        this.speedX = Math.floor(
          Math.random() * (2 * this.speedMax + 1) - this.speedMax
        );
        this.speedY = Math.floor(
          Math.random() * (2 * this.speedMax + 1) - this.speedMax
        );

        this.computeAcceleration();
      },

      update() {
        this.computeAcceleration();

        if (this.x + this.speedX > canva.width - this.size) {
          this.speedX *= -1;
        } else if (this.x + this.speedX < this.size) {
          this.speedX *= -1;
        }

        if (this.y + this.speedY > canva.height - this.size) {
          this.speedY *= -1;
        } else if (this.y + this.speedY + this.aY <= this.size) {
          this.speedY *= -1;
        }

        this.aY = this.g + this.resultante;

        this.speedX += this.aX;
        this.speedY += this.aY;

        this.speedX *= 0.995;
        this.speedY *= 0.985;

        if (Math.abs(this.speedY) < 0.95487) {
          this.speedY = 0;
        }

        this.x += this.speedX;
        this.y += this.speedY;
      },

      computeAcceleration() {
        if (this.y + this.speedY + this.aY <= this.size) {
          this.resultante = -this.g;
        } else {
          this.resultante = 0;
        }
      }
    };

    var context = canva.getContext("2d");

    context.scale(1, -1);
    context.translate(0, -canva.height);

    function draw() {
      context.clearRect(0, 0, canva.width, canva.height);

      context.fillStyle = "rgb(230, 230, 230)";
      context.fillRect(0, 0, canva.width, canva.height);

      context.fillStyle = "black";
      context.beginPath();
      context.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
      context.fill();

      ball.update();

      window.requestAnimationFrame(function() {
        draw();
      });
    }

    ball.init();
    draw();
  },
  false
);
