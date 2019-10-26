import '@/style/colors.css';
import '@/style/layout.css';
import * as theme from '@/style/theme';
import GameEngine from '@/js/gameEngine/GameEngine';

import Planet from '@/js/planet';
import CameraHandler from '@/js/cameraHandler';
import Stars from '@/js/stars';

let game;

let cameraHandle;

/** Main app method. everything starts from here */
function main() {
  game = new GameEngine({
    background: theme.background,
  });

  // camera handler
  cameraHandle = new CameraHandler();
  cameraHandle.add(game.camera);
  game.camera.position.y = 1.1;
  game.camera.rotateX(-0.09);
  game.add(cameraHandle);

  game.add( new Planet() );
  game.add( new Stars(8000, theme.foreground, 100) );
}

main();
