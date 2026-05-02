import HeroVisualSVG from "./HeroVisualSVG";
import HeroVisual3DUpgrader from "./HeroVisual3DUpgrader";

export default function HeroVisual() {
  return (
    <div className="relative aspect-square">
      <HeroVisualSVG />
      <HeroVisual3DUpgrader />
    </div>
  );
}
