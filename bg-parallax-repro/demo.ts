// Minimal repro: a BgParallax (view-progress) effect rendered through @wix/interact's CSS path (generate()).
import { Interact, add, generate, type InteractConfig } from '@wix/interact';
import * as presets from '@wix/motion-presets';

Interact.registerEffects(presets as any);

const config: InteractConfig = {
  interactions: [{
    key: 'strip',
    trigger: 'viewProgress',
    effects: [{ key: 'strip', effectId: 'parallax', selector: '[data-motion-part~="BG_MEDIA"]' }],
  }],
  effects: {
    parallax: {
      namedEffect: { type: 'BgParallax' } as any,
      fill: 'both',
      rangeStart: { name: 'cover', offset: { value: 0, unit: 'percentage' } },
      rangeEnd: { name: 'cover', offset: { value: 100, unit: 'percentage' } },
    } as any,
  },
};

const css = generate(config, false);
document.head.append(Object.assign(document.createElement('style'), { textContent: css }));
Interact.create(config);
add(document.getElementById('strip')!, 'strip');

// What generate() emitted for the background layer, and what the browser computes from it while scrolling.
const rule = css.match(/\[data-interact-key="strip"\] \[data-motion-part[^{]*\{[^}]*\}/)?.[0] ?? '(no rule)';
document.getElementById('rule')!.textContent = rule.replace(/^\s+/gm, '  ').replace(/^  \[/, '[');
const media = document.querySelector<HTMLElement>('[data-motion-part~="BG_MEDIA"]')!;
const readout = document.getElementById('readout')!;
const update = () => {
  const cs = getComputedStyle(media);
  const speed = cs.getPropertyValue('--motion-parallax-speed').trim();
  readout.textContent = `--motion-parallax-speed: ${speed || '(not set)'}\ntransform: ${cs.transform}`;
  readout.dataset.moving = String(cs.transform !== 'none');
  requestAnimationFrame(update);
};
update();
