import { types } from 'mobx-state-tree';
import { PER_REGION_MODES } from './PerRegionModes';


/**
 * This mixing defines perRegion control tag's parameter and related basic functionality
 * It should be used right after ClassificationBase mixin
 * @see ClassificationBase
 */
const PerRegionMixin = types
  .model({
    perregion: types.optional(types.boolean, false),
    whenlabelvalue: types.maybeNull(types.string),
    displaymode: types.optional(types.enumeration(Object.values(PER_REGION_MODES)), PER_REGION_MODES.TAG),
  }).extend(self => {
    /* Validation */
    if (self.isClassificationTag !== true) {
      throw new Error('The PerRegionMixin mixin should be used only for classification control-tags');
    }
    return {};
  }).volatile(() => {
    return {
      focusable: false,
    };
  },
  ).views(self => ({
    get perRegionArea() {
      if (!self.perregion && !self.isLabeling) return null;
      return self.annotation.highlightedNode;
    },
    get _perRegionResult() {
      const area = self.perRegionArea;

      if (!area) return null;

      return self.annotation.results.find(r => r.from_name === self && r.area === area);
    },
    perRegionVisible() {
      if (!self.perregion) return true;

      const region = self.perRegionArea;

      if (!region) {
        // no region is selected return hidden
        return false;
      }
      // check if selected region is the one this tag is connected to
      if (region.parent.name !== self.toname) return false;

      // we may need to check for specific value
      if (self.whenlabelvalue !== null && self.whenlabelvalue !== undefined)
        return region.hasLabel(self.whenlabelvalue);

      return true;
    },
  }))
  .actions(self => ({
    createPerRegionResult() {
      self.perRegionArea?.setValue(self);
    },
  }));

export default PerRegionMixin;
export { PER_REGION_MODES } from './PerRegionModes';
