import '@/style/colors.css';
import '@/style/layout.css';
import * as theme from '@/style/theme';
import GameEngine from '@/js/gameEngine/GameEngine';

import Planet from '@/js/gameObjects/planet';
import CameraHandler from '@/js/gameObjects/cameraHandler';
import Stars from '@/js/gameObjects/stars';
import Swing from '@/js/gameObjects/Swing';

/** Main app method. everything starts from here */
function main() {
  const game = new GameEngine({
    background: theme.background,
  });
  // game.paused = true;

  const swing = new Swing();
  const planet = new Planet();

  game.add( swing );
  game.add( new CameraHandler(game.camera, swing, planet) );
  game.add( planet );
  game.add( new Stars(6000, theme.foreground, 100) );
}

main();
