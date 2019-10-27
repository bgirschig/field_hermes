import '@/style/colors.css';
import '@/style/layout.css';
import * as theme from '@/style/theme';
import GameEngine from '@/js/gameEngine/GameEngine';

import Planet from '@/js/planet';
import CameraHandler from '@/js/cameraHandler';
import Stars from '@/js/stars';

/** Main app method. everything starts from here */
function main() {
  const game = new GameEngine({
    background: theme.background,
  });

  game.add( new CameraHandler(game.camera) );
  game.add( new Planet() );
  game.add( new Stars(6000, theme.foreground, 100) );
}

main();
