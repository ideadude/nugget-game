var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    antialias: false
};

var player;
var graphics;
var cursors;
var text;
var moveCam = false;

var game = new Phaser.Game(config);

function preload ()
{    
    this.load.atlas('farm', 'assets/farm.png', 'assets/farm.json');
}

function create ()
{
    //  Set the camera and physics bounds to be the size of 4x4 bg images
    this.cameras.main.setBounds(-1024, -1024, 1024 * 2, 1024 * 2);
    this.physics.world.setBounds(-1024, -1024, 1024 * 2, 1024 * 2);
   
    cursors = this.input.keyboard.createCursorKeys();

    // Load farm sprites.
    var atlasTexture = this.textures.get('farm');
    var frames = atlasTexture.getFrameNames();  

    // Background
    grass1 = this.physics.add.image(0, 0, 'farm', 'sprite341');
    grass1.setScale(8);

    background = this.add.tileSprite(0, 0, 1024*8, 1024*8, 'farm', 'sprite341');
    background.tileScaleX = 8;
    background.tileScaleY = 8;

    // Chicken
    player = this.physics.add.image(0, 0, 'farm', 'sprite244');
    player.setScale(8);
    player.setCollideWorldBounds(true);

    this.cameras.main.startFollow(player, true);

    this.cameras.main.setDeadzone(400, 200);
    this.cameras.main.setZoom(0.5);

    text = this.add.text(32, 32).setScrollFactor(0).setFontSize(32).setColor('#ffffff');
}

function update ()
{
    var cam = this.cameras.main;
    var velocity_base = 400;

    /*
    text.setText([
        'ScrollX: ' + cam.scrollX,
        'ScrollY: ' + cam.scrollY,
        'MidX: ' + cam.midPoint.x,
        'MidY: ' + cam.midPoint.y
    ]);
    */

    player.setVelocity(0);

    if (cursors.shift.isDown) {
        velocity_base = 1000;
    } else {
        velocity_base = 400;
    }

    if (cursors.left.isDown)
    {
        player.setVelocityX(0-velocity_base);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(velocity_base);
    }

    if (cursors.up.isDown)
    {
        player.setVelocityY(0-velocity_base);
    }
    else if (cursors.down.isDown)
    {
        player.setVelocityY(velocity_base);
    }
}