"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var vega_util_1 = require("vega-util");
var compositemark_1 = require("./compositemark");
var index_1 = require("./compositemark/index");
var guide_1 = require("./guide");
var legend_1 = require("./legend");
var mark_1 = require("./mark");
var mark = require("./mark");
var scale_1 = require("./scale");
var selection_1 = require("./selection");
var title_1 = require("./title");
var util_1 = require("./util");
exports.defaultViewConfig = {
    width: 200,
    height: 200
};
exports.defaultConfig = {
    padding: 5,
    timeFormat: '%b %d, %Y',
    countTitle: 'Number of Records',
    invalidValues: 'filter',
    view: exports.defaultViewConfig,
    mark: mark.defaultMarkConfig,
    area: {},
    bar: mark.defaultBarConfig,
    circle: {},
    geoshape: {},
    line: {},
    point: {},
    rect: {},
    rule: { color: 'black' },
    square: {},
    text: { color: 'black' },
    tick: mark.defaultTickConfig,
    trail: {},
    box: { size: 14, extent: 1.5 },
    boxWhisker: {},
    boxMid: { color: 'white' },
    scale: scale_1.defaultScaleConfig,
    projection: {},
    axis: {},
    axisX: {},
    axisY: { minExtent: 30 },
    axisLeft: {},
    axisRight: {},
    axisTop: {},
    axisBottom: {},
    axisBand: {},
    legend: legend_1.defaultLegendConfig,
    selection: selection_1.defaultConfig,
    style: {},
    title: {},
};
function initConfig(config) {
    return util_1.mergeDeep(util_1.duplicate(exports.defaultConfig), config);
}
exports.initConfig = initConfig;
var MARK_STYLES = ['view'].concat(mark_1.PRIMITIVE_MARKS, compositemark_1.COMPOSITE_MARK_STYLES);
var VL_ONLY_CONFIG_PROPERTIES = [
    'padding', 'numberFormat', 'timeFormat', 'countTitle',
    'stack', 'scale', 'selection', 'invalidValues',
    'overlay' // FIXME: Redesign and unhide this
];
var VL_ONLY_ALL_MARK_SPECIFIC_CONFIG_PROPERTY_INDEX = tslib_1.__assign({ view: ['width', 'height'] }, mark_1.VL_ONLY_MARK_SPECIFIC_CONFIG_PROPERTY_INDEX, index_1.VL_ONLY_COMPOSITE_MARK_SPECIFIC_CONFIG_PROPERTY_INDEX);
function stripAndRedirectConfig(config) {
    config = util_1.duplicate(config);
    for (var _i = 0, VL_ONLY_CONFIG_PROPERTIES_1 = VL_ONLY_CONFIG_PROPERTIES; _i < VL_ONLY_CONFIG_PROPERTIES_1.length; _i++) {
        var prop = VL_ONLY_CONFIG_PROPERTIES_1[_i];
        delete config[prop];
    }
    // Remove Vega-Lite only axis/legend config
    if (config.axis) {
        for (var _a = 0, VL_ONLY_GUIDE_CONFIG_1 = guide_1.VL_ONLY_GUIDE_CONFIG; _a < VL_ONLY_GUIDE_CONFIG_1.length; _a++) {
            var prop = VL_ONLY_GUIDE_CONFIG_1[_a];
            delete config.axis[prop];
        }
    }
    if (config.legend) {
        for (var _b = 0, VL_ONLY_GUIDE_CONFIG_2 = guide_1.VL_ONLY_GUIDE_CONFIG; _b < VL_ONLY_GUIDE_CONFIG_2.length; _b++) {
            var prop = VL_ONLY_GUIDE_CONFIG_2[_b];
            delete config.legend[prop];
        }
    }
    // Remove Vega-Lite only generic mark config
    if (config.mark) {
        for (var _c = 0, VL_ONLY_MARK_CONFIG_PROPERTIES_1 = mark_1.VL_ONLY_MARK_CONFIG_PROPERTIES; _c < VL_ONLY_MARK_CONFIG_PROPERTIES_1.length; _c++) {
            var prop = VL_ONLY_MARK_CONFIG_PROPERTIES_1[_c];
            delete config.mark[prop];
        }
    }
    for (var _d = 0, MARK_STYLES_1 = MARK_STYLES; _d < MARK_STYLES_1.length; _d++) {
        var markType = MARK_STYLES_1[_d];
        // Remove Vega-Lite-only mark config
        for (var _e = 0, VL_ONLY_MARK_CONFIG_PROPERTIES_2 = mark_1.VL_ONLY_MARK_CONFIG_PROPERTIES; _e < VL_ONLY_MARK_CONFIG_PROPERTIES_2.length; _e++) {
            var prop = VL_ONLY_MARK_CONFIG_PROPERTIES_2[_e];
            delete config[markType][prop];
        }
        // Remove Vega-Lite only mark-specific config
        var vlOnlyMarkSpecificConfigs = VL_ONLY_ALL_MARK_SPECIFIC_CONFIG_PROPERTY_INDEX[markType];
        if (vlOnlyMarkSpecificConfigs) {
            for (var _f = 0, vlOnlyMarkSpecificConfigs_1 = vlOnlyMarkSpecificConfigs; _f < vlOnlyMarkSpecificConfigs_1.length; _f++) {
                var prop = vlOnlyMarkSpecificConfigs_1[_f];
                delete config[markType][prop];
            }
        }
        // Redirect mark config to config.style so that mark config only affect its own mark type
        // without affecting other marks that share the same underlying Vega marks.
        // For example, config.rect should not affect bar marks.
        redirectConfig(config, markType);
    }
    // Redirect config.title -- so that title config do not
    // affect header labels, which also uses `title` directive to implement.
    redirectConfig(config, 'title', 'group-title');
    // Remove empty config objects
    for (var prop in config) {
        if (vega_util_1.isObject(config[prop]) && util_1.keys(config[prop]).length === 0) {
            delete config[prop];
        }
    }
    return util_1.keys(config).length > 0 ? config : undefined;
}
exports.stripAndRedirectConfig = stripAndRedirectConfig;
function redirectConfig(config, prop, toProp) {
    var propConfig = prop === 'title' ? title_1.extractTitleConfig(config.title).mark : config[prop];
    if (prop === 'view') {
        toProp = 'cell'; // View's default style is "cell"
    }
    var style = tslib_1.__assign({}, propConfig, config.style[prop]);
    // set config.style if it is not an empty object
    if (util_1.keys(style).length > 0) {
        config.style[toProp || prop] = style;
    }
    delete config[prop];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx1Q0FBbUM7QUFFbkMsaURBQXNEO0FBQ3RELCtDQUEySTtBQUMzSSxpQ0FBNkM7QUFDN0MsbUNBQTJEO0FBQzNELCtCQUE0STtBQUM1SSw2QkFBK0I7QUFFL0IsaUNBQXdEO0FBQ3hELHlDQUFxRjtBQUVyRixpQ0FBMkM7QUFFM0MsK0JBQWtEO0FBb0ZyQyxRQUFBLGlCQUFpQixHQUFlO0lBQzNDLEtBQUssRUFBRSxHQUFHO0lBQ1YsTUFBTSxFQUFFLEdBQUc7Q0FDWixDQUFDO0FBNEhXLFFBQUEsYUFBYSxHQUFXO0lBQ25DLE9BQU8sRUFBRSxDQUFDO0lBQ1YsVUFBVSxFQUFFLFdBQVc7SUFDdkIsVUFBVSxFQUFFLG1CQUFtQjtJQUUvQixhQUFhLEVBQUUsUUFBUTtJQUV2QixJQUFJLEVBQUUseUJBQWlCO0lBRXZCLElBQUksRUFBRSxJQUFJLENBQUMsaUJBQWlCO0lBQzVCLElBQUksRUFBRSxFQUFFO0lBQ1IsR0FBRyxFQUFFLElBQUksQ0FBQyxnQkFBZ0I7SUFDMUIsTUFBTSxFQUFFLEVBQUU7SUFDVixRQUFRLEVBQUUsRUFBRTtJQUNaLElBQUksRUFBRSxFQUFFO0lBQ1IsS0FBSyxFQUFFLEVBQUU7SUFDVCxJQUFJLEVBQUUsRUFBRTtJQUNSLElBQUksRUFBRSxFQUFDLEtBQUssRUFBRSxPQUFPLEVBQUM7SUFDdEIsTUFBTSxFQUFFLEVBQUU7SUFDVixJQUFJLEVBQUUsRUFBQyxLQUFLLEVBQUUsT0FBTyxFQUFDO0lBQ3RCLElBQUksRUFBRSxJQUFJLENBQUMsaUJBQWlCO0lBQzVCLEtBQUssRUFBRSxFQUFFO0lBRVQsR0FBRyxFQUFFLEVBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFDO0lBQzVCLFVBQVUsRUFBRSxFQUFFO0lBQ2QsTUFBTSxFQUFFLEVBQUMsS0FB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QUFDLElBQUksQ0FBQyxDQUN0QixDQUFDO0lBQ0YsZ0RBQWdEO0lBQ2hELElBQUksV0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDMUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO0tBQ3RDO0lBQ0QsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNPYmplY3R9IGZyb20gJ3ZlZ2EtdXRpbCc7XG5pbXBvcnQge0F4aXNDb25maWdNaXhpbnN9IGZyb20gJy4vYXhpcyc7XG5pbXBvcnQge0NPTVBPU0lURV9NQVJLX1NUWUxFU30gZnJvbSAnLi9jb21wb3NpdGVtYXJrJztcbmltcG9ydCB7Q29tcG9zaXRlTWFya0NvbmZpZ01peGlucywgQ29tcG9zaXRlTWFya1N0eWxlLCBWTF9PTkxZX0NPTVBPU0lURV9NQVJLX1NQRUNJRklDX0NPTkZJR19QUk9QRVJUWV9JTkRFWH0gZnJvbSAnLi9jb21wb3NpdGVtYXJrL2luZGV4JztcbmltcG9ydCB7VkxfT05MWV9HVUlERV9DT05GSUd9IGZyb20gJy4vZ3VpZGUnO1xuaW1wb3J0IHtkZWZhdWx0TGVnZW5kQ29uZmlnLCBMZWdlbmRDb25maWd9IGZyb20gJy4vbGVnZW5kJztcbmltcG9ydCB7TWFyaywgTWFya0NvbmZpZ01peGlucywgUFJJTUlUSVZFX01BUktTLCBWTF9PTkxZX01BUktfQ09ORklHX1BST1BFUlRJRVMsIFZMX09OTFlfTUFSS19TUEVDSUZJQ19DT05GSUdfUFJPUEVSVFlfSU5ERVh9IGZyb20gJy4vbWFyayc7XG5pbXBvcnQgKiBhcyBtYXJrIGZyb20gJy4vbWFyayc7XG5pbXBvcnQge1Byb2plY3Rpb25Db25maWd9IGZyb20gJy4vcHJvamVjdGlvbic7XG5pbXBvcnQge2RlZmF1bHRTY2FsZUNvbmZpZywgU2NhbGVDb25maWd9IGZyb20gJy4vc2NhbGUnO1xuaW1wb3J0IHtkZWZhdWx0Q29uZmlnIGFzIGRlZmF1bHRTZWxlY3Rpb25Db25maWcsIFNlbGVjdGlvbkNvbmZpZ30gZnJvbSAnLi9zZWxlY3Rpb24nO1xuaW1wb3J0IHtTdGFja09mZnNldH0gZnJvbSAnLi9zdGFjayc7XG5pbXBvcnQge2V4dHJhY3RUaXRsZUNvbmZpZ30gZnJvbSAnLi90aXRsZSc7XG5pbXBvcnQge1RvcExldmVsUHJvcGVydGllc30gZnJvbSAnLi90b3BsZXZlbHByb3BzJztcbmltcG9ydCB7ZHVwbGljYXRlLCBrZXlzLCBtZXJnZURlZXB9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQge1ZnTWFya0NvbmZpZywgVmdTY2hlbWUsIFZnVGl0bGVDb25maWd9IGZyb20gJy4vdmVnYS5zY2hlbWEnO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgVmlld0NvbmZpZyB7XG4gIC8qKlxuICAgKiBUaGUgZGVmYXVsdCB3aWR0aCBvZiB0aGUgc2luZ2xlIHBsb3Qgb3IgZWFjaCBwbG90IGluIGEgdHJlbGxpcyBwbG90IHdoZW4gdGhlIHZpc3VhbGl6YXRpb24gaGFzIGEgY29udGludW91cyAobm9uLW9yZGluYWwpIHgtc2NhbGUgb3Igb3JkaW5hbCB4LXNjYWxlIHdpdGggYHJhbmdlU3RlcGAgPSBgbnVsbGAuXG4gICAqXG4gICAqIF9fRGVmYXVsdCB2YWx1ZTpfXyBgMjAwYFxuICAgKlxuICAgKi9cbiAgd2lkdGg/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBkZWZhdWx0IGhlaWdodCBvZiB0aGUgc2luZ2xlIHBsb3Qgb3IgZWFjaCBwbG90IGluIGEgdHJlbGxpcyBwbG90IHdoZW4gdGhlIHZpc3VhbGl6YXRpb24gaGFzIGEgY29udGludW91cyAobm9uLW9yZGluYWwpIHktc2NhbGUgd2l0aCBgcmFuZ2VTdGVwYCA9IGBudWxsYC5cbiAgICpcbiAgICogX19EZWZhdWx0IHZhbHVlOl9fIGAyMDBgXG4gICAqXG4gICAqL1xuICBoZWlnaHQ/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIHZpZXcgc2hvdWxkIGJlIGNsaXBwZWQuXG4gICAqL1xuICBjbGlwPzogYm9vbGVhbjtcblxuICAvLyBGSUxMX1NUUk9LRV9DT05GSUdcbiAgLyoqXG4gICAqIFRoZSBmaWxsIGNvbG9yLlxuICAgKlxuICAgKiBfX0RlZmF1bHQgdmFsdWU6X18gKG5vbmUpXG4gICAqXG4gICAqL1xuICBmaWxsPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgZmlsbCBvcGFjaXR5ICh2YWx1ZSBiZXR3ZWVuIFswLDFdKS5cbiAgICpcbiAgICogX19EZWZhdWx0IHZhbHVlOl9fIChub25lKVxuICAgKlxuICAgKi9cbiAgZmlsbE9wYWNpdHk/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBzdHJva2UgY29sb3IuXG4gICAqXG4gICAqIF9fRGVmYXVsdCB2YWx1ZTpfXyAobm9uZSlcbiAgICpcbiAgICovXG4gIHN0cm9rZT86IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHN0cm9rZSBvcGFjaXR5ICh2YWx1ZSBiZXR3ZWVuIFswLDFdKS5cbiAgICpcbiAgICogX19EZWZhdWx0IHZhbHVlOl9fIChub25lKVxuICAgKlxuICAgKi9cbiAgc3Ryb2tlT3BhY2l0eT86IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIHN0cm9rZSB3aWR0aCwgaW4gcGl4ZWxzLlxuICAgKlxuICAgKiBfX0RlZmF1bHQgdmFsdWU6X18gKG5vbmUpXG4gICAqXG4gICAqL1xuICBzdHJva2VXaWR0aD86IG51bWJlcjtcblxuICAvKipcbiAgICogQW4gYXJyYXkgb2YgYWx0ZXJuYXRpbmcgc3Ryb2tlLCBzcGFjZSBsZW5ndGhzIGZvciBjcmVhdGluZyBkYXNoZWQgb3IgZG90dGVkIGxpbmVzLlxuICAgKlxuICAgKiBfX0RlZmF1bHQgdmFsdWU6X18gKG5vbmUpXG4gICAqXG4gICAqL1xuICBzdHJva2VEYXNoPzogbnVtYmVyW107XG5cbiAgLyoqXG4gICAqIFRoZSBvZmZzZXQgKGluIHBpeGVscykgaW50byB3aGljaCB0byBiZWdpbiBkcmF3aW5nIHdpdGggdGhlIHN0cm9rZSBkYXNoIGFycmF5LlxuICAgKlxuICAgKiBfX0RlZmF1bHQgdmFsdWU6X18gKG5vbmUpXG4gICAqXG4gICAqL1xuICBzdHJva2VEYXNoT2Zmc2V0PzogbnVtYmVyO1xufVxuXG5leHBvcnQgY29uc3QgZGVmYXVsdFZpZXdDb25maWc6IFZpZXdDb25maWcgPSB7XG4gIHdpZHRoOiAyMDAsXG4gIGhlaWdodDogMjAwXG59O1xuXG5leHBvcnQgdHlwZSBSYW5nZUNvbmZpZ1ZhbHVlID0gKG51bWJlcnxzdHJpbmcpW10gfCBWZ1NjaGVtZSB8IHtzdGVwOiBudW1iZXJ9O1xuXG5leHBvcnQgdHlwZSBSYW5nZUNvbmZpZyA9IFJhbmdlQ29uZmlnUHJvcHMgJiB7W25hbWU6IHN0cmluZ106IFJhbmdlQ29uZmlnVmFsdWV9O1xuXG5leHBvcnQgaW50ZXJmYWNlIFJhbmdlQ29uZmlnUHJvcHMge1xuICAvKipcbiAgICogRGVmYXVsdCByYW5nZSBmb3IgX25vbWluYWxfIChjYXRlZ29yaWNhbCkgZmllbGRzLlxuICAgKi9cbiAgY2F0ZWdvcnk/OiBzdHJpbmdbXSB8IFZnU2NoZW1lO1xuXG4gIC8qKlxuICAgKiBEZWZhdWx0IHJhbmdlIGZvciBkaXZlcmdpbmcgX3F1YW50aXRhdGl2ZV8gZmllbGRzLlxuICAgKi9cbiAgZGl2ZXJnaW5nPzogc3RyaW5nW10gfCBWZ1NjaGVtZTtcblxuICAvKipcbiAgICogRGVmYXVsdCByYW5nZSBmb3IgX3F1YW50aXRhdGl2ZV8gaGVhdG1hcHMuXG4gICAqL1xuICBoZWF0bWFwPzogc3RyaW5nW10gfCBWZ1NjaGVtZTtcblxuICAvKipcbiAgICogRGVmYXVsdCByYW5nZSBmb3IgX29yZGluYWxfIGZpZWxkcy5cbiAgICovXG4gIG9yZGluYWw/OiBzdHJpbmdbXSB8IFZnU2NoZW1lO1xuXG4gIC8qKlxuICAgKiBEZWZhdWx0IHJhbmdlIGZvciBfcXVhbnRpdGF0aXZlXyBhbmQgX3RlbXBvcmFsXyBmaWVsZHMuXG4gICAqL1xuICByYW1wPzogc3RyaW5nW10gfCBWZ1NjaGVtZTtcblxuICAvKipcbiAgICogRGVmYXVsdCByYW5nZSBwYWxldHRlIGZvciB0aGUgYHNoYXBlYCBjaGFubmVsLlxuICAgKi9cbiAgc3ltYm9sPzogc3RyaW5nW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVkxPbmx5Q29uZmlnIHtcbiAgLyoqXG4gICAqIERlZmF1bHQgYXhpcyBhbmQgbGVnZW5kIHRpdGxlIGZvciBjb3VudCBmaWVsZHMuXG4gICAqXG4gICAqIF9fRGVmYXVsdCB2YWx1ZTpfXyBgJ051bWJlciBvZiBSZWNvcmRzJ2AuXG4gICAqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICBjb3VudFRpdGxlPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBEZWZpbmVzIGhvdyBWZWdhLUxpdGUgc2hvdWxkIGhhbmRsZSBpbnZhbGlkIHZhbHVlcyAoYG51bGxgIGFuZCBgTmFOYCkuXG4gICAqIC0gSWYgc2V0IHRvIGBcImZpbHRlclwiYCAoZGVmYXVsdCksIGFsbCBkYXRhIGl0ZW1zIHdpdGggbnVsbCB2YWx1ZXMgd2lsbCBiZSBza2lwcGVkIChmb3IgbGluZSwgdHJhaWwsIGFuZCBhcmVhIG1hcmtzKSBvciBmaWx0ZXJlZCAoZm9yIG90aGVyIG1hcmtzKS5cbiAgICogLSBJZiBgbnVsbGAsIGFsbCBkYXRhIGl0ZW1zIGFyZSBpbmNsdWRlZC4gSW4gdGhpcyBjYXNlLCBpbnZhbGlkIHZhbHVlcyB3aWxsIGJlIGludGVycHJldGVkIGFzIHplcm9lcy5cbiAgICovXG4gIGludmFsaWRWYWx1ZXM/OiAnZmlsdGVyJyB8IG51bGw7XG5cbiAgLyoqXG4gICAqIERlZmluZXMgaG93IFZlZ2EtTGl0ZSBnZW5lcmF0ZXMgdGl0bGUgZm9yIGZpZWxkcy4gIFRoZXJlIGFyZSB0aHJlZSBwb3NzaWJsZSBzdHlsZXM6XG4gICAqIC0gYFwidmVyYmFsXCJgIChEZWZhdWx0KSAtIGRpc3BsYXlzIGZ1bmN0aW9uIGluIGEgdmVyYmFsIHN0eWxlIChlLmcuLCBcIlN1bSBvZiBmaWVsZFwiLCBcIlllYXItbW9udGggb2YgZGF0ZVwiLCBcImZpZWxkIChiaW5uZWQpXCIpLlxuICAgKiAtIGBcImZ1bmN0aW9uXCJgIC0gZGlzcGxheXMgZnVuY3Rpb24gdXNpbmcgcGFyZW50aGVzZXMgYW5kIGNhcGl0YWxpemVkIHRleHRzIChlLmcuLCBcIlNVTShmaWVsZClcIiwgXCJZRUFSTU9OVEgoZGF0ZSlcIiwgXCJCSU4oZmllbGQpXCIpLlxuICAgKiAtIGBcInBsYWluXCJgIC0gZGlzcGxheXMgb25seSB0aGUgZmllbGQgbmFtZSB3aXRob3V0IGZ1bmN0aW9ucyAoZS5nLiwgXCJmaWVsZFwiLCBcImRhdGVcIiwgXCJmaWVsZFwiKS5cbiAgICovXG4gIGZpZWxkVGl0bGU/OiAndmVyYmFsJyB8ICdmdW5jdGlvbmFsJyB8ICdwbGFpbic7XG5cbiAgLyoqXG4gICAqIEQzIE51bWJlciBmb3JtYXQgZm9yIGF4aXMgbGFiZWxzIGFuZCB0ZXh0IHRhYmxlcy4gRm9yIGV4YW1wbGUgXCJzXCIgZm9yIFNJIHVuaXRzLiBVc2UgW0QzJ3MgbnVtYmVyIGZvcm1hdCBwYXR0ZXJuXShodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtZm9ybWF0I2xvY2FsZV9mb3JtYXQpLlxuICAgKi9cbiAgbnVtYmVyRm9ybWF0Pzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBEZWZhdWx0IGRhdGV0aW1lIGZvcm1hdCBmb3IgYXhpcyBhbmQgbGVnZW5kIGxhYmVscy4gVGhlIGZvcm1hdCBjYW4gYmUgc2V0IGRpcmVjdGx5IG9uIGVhY2ggYXhpcyBhbmQgbGVnZW5kLiBVc2UgW0QzJ3MgdGltZSBmb3JtYXQgcGF0dGVybl0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLXRpbWUtZm9ybWF0I2xvY2FsZV9mb3JtYXQpLlxuICAgKlxuICAgKiBfX0RlZmF1bHQgdmFsdWU6X18gYCclYiAlZCwgJVknYC5cbiAgICpcbiAgICovXG4gIHRpbWVGb3JtYXQ/OiBzdHJpbmc7XG5cblxuICAvKiogRGVmYXVsdCBwcm9wZXJ0aWVzIGZvciBbc2luZ2xlIHZpZXcgcGxvdHNdKHNwZWMuaHRtbCNzaW5nbGUpLiAqL1xuICB2aWV3PzogVmlld0NvbmZpZztcblxuICAvKipcbiAgICogU2NhbGUgY29uZmlndXJhdGlvbiBkZXRlcm1pbmVzIGRlZmF1bHQgcHJvcGVydGllcyBmb3IgYWxsIFtzY2FsZXNdKHNjYWxlLmh0bWwpLiBGb3IgYSBmdWxsIGxpc3Qgb2Ygc2NhbGUgY29uZmlndXJhdGlvbiBvcHRpb25zLCBwbGVhc2Ugc2VlIHRoZSBbY29ycmVzcG9uZGluZyBzZWN0aW9uIG9mIHRoZSBzY2FsZSBkb2N1bWVudGF0aW9uXShzY2FsZS5odG1sI2NvbmZpZykuXG4gICAqL1xuICBzY2FsZT86IFNjYWxlQ29uZmlnO1xuXG4gIC8qKiBBbiBvYmplY3QgaGFzaCBmb3IgZGVmaW5pbmcgZGVmYXVsdCBwcm9wZXJ0aWVzIGZvciBlYWNoIHR5cGUgb2Ygc2VsZWN0aW9ucy4gKi9cbiAgc2VsZWN0aW9uPzogU2VsZWN0aW9uQ29uZmlnO1xuXG4gIC8qKiBEZWZhdWx0IHN0YWNrIG9mZnNldCBmb3Igc3RhY2thYmxlIG1hcmsuICovXG4gIHN0YWNrPzogU3RhY2tPZmZzZXQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3R5bGVDb25maWdJbmRleCB7XG4gIFtzdHlsZTogc3RyaW5nXTogVmdNYXJrQ29uZmlnO1xufVxuXG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29uZmlnIGV4dGVuZHMgVG9wTGV2ZWxQcm9wZXJ0aWVzLCBWTE9ubHlDb25maWcsIE1hcmtDb25maWdNaXhpbnMsIENvbXBvc2l0ZU1hcmtDb25maWdNaXhpbnMsIEF4aXNDb25maWdNaXhpbnMge1xuXG4gIC8qKlxuICAgKiBBbiBvYmplY3QgaGFzaCB0aGF0IGRlZmluZXMgZGVmYXVsdCByYW5nZSBhcnJheXMgb3Igc2NoZW1lcyBmb3IgdXNpbmcgd2l0aCBzY2FsZXMuXG4gICAqIEZvciBhIGZ1bGwgbGlzdCBvZiBzY2FsZSByYW5nZSBjb25maWd1cmF0aW9uIG9wdGlvbnMsIHBsZWFzZSBzZWUgdGhlIFtjb3JyZXNwb25kaW5nIHNlY3Rpb24gb2YgdGhlIHNjYWxlIGRvY3VtZW50YXRpb25dKHNjYWxlLmh0bWwjY29uZmlnKS5cbiAgICovXG4gIHJhbmdlPzogUmFuZ2VDb25maWc7XG5cbiAgLyoqXG4gICAqIExlZ2VuZCBjb25maWd1cmF0aW9uLCB3aGljaCBkZXRlcm1pbmVzIGRlZmF1bHQgcHJvcGVydGllcyBmb3IgYWxsIFtsZWdlbmRzXShsZWdlbmQuaHRtbCkuIEZvciBhIGZ1bGwgbGlzdCBvZiBsZWdlbmQgY29uZmlndXJhdGlvbiBvcHRpb25zLCBwbGVhc2Ugc2VlIHRoZSBbY29ycmVzcG9uZGluZyBzZWN0aW9uIG9mIGluIHRoZSBsZWdlbmQgZG9jdW1lbnRhdGlvbl0obGVnZW5kLmh0bWwjY29uZmlnKS5cbiAgICovXG4gIGxlZ2VuZD86IExlZ2VuZENvbmZpZztcblxuICAvKipcbiAgICogVGl0bGUgY29uZmlndXJhdGlvbiwgd2hpY2ggZGV0ZXJtaW5lcyBkZWZhdWx0IHByb3BlcnRpZXMgZm9yIGFsbCBbdGl0bGVzXSh0aXRsZS5odG1sKS4gRm9yIGEgZnVsbCBsaXN0IG9mIHRpdGxlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucywgcGxlYXNlIHNlZSB0aGUgW2NvcnJlc3BvbmRpbmcgc2VjdGlvbiBvZiB0aGUgdGl0bGUgZG9jdW1lbnRhdGlvbl0odGl0bGUuaHRtbCNjb25maWcpLlxuICAgKi9cbiAgdGl0bGU/OiBWZ1RpdGxlQ29uZmlnO1xuXG4gIC8qKlxuICAgKiBQcm9qZWN0aW9uIGNvbmZpZ3VyYXRpb24sIHdoaWNoIGRldGVybWluZXMgZGVmYXVsdCBwcm9wZXJ0aWVzIGZvciBhbGwgW3Byb2plY3Rpb25zXShwcm9qZWN0aW9uLmh0bWwpLiBGb3IgYSBmdWxsIGxpc3Qgb2YgcHJvamVjdGlvbiBjb25maWd1cmF0aW9uIG9wdGlvbnMsIHBsZWFzZSBzZWUgdGhlIFtjb3JyZXNwb25kaW5nIHNlY3Rpb24gb2YgdGhlIHByb2plY3Rpb24gZG9jdW1lbnRhdGlvbl0ocHJvamVjdGlvbi5odG1sI2NvbmZpZykuXG4gICAqL1xuICBwcm9qZWN0aW9uPzogUHJvamVjdGlvbkNvbmZpZztcblxuICAvKiogQW4gb2JqZWN0IGhhc2ggdGhhdCBkZWZpbmVzIGtleS12YWx1ZSBtYXBwaW5ncyB0byBkZXRlcm1pbmUgZGVmYXVsdCBwcm9wZXJ0aWVzIGZvciBtYXJrcyB3aXRoIGEgZ2l2ZW4gW3N0eWxlXShtYXJrLmh0bWwjbWFyay1kZWYpLiAgVGhlIGtleXMgcmVwcmVzZW50IHN0eWxlcyBuYW1lczsgdGhlIHZhbHVlcyBoYXZlIHRvIGJlIHZhbGlkIFttYXJrIGNvbmZpZ3VyYXRpb24gb2JqZWN0c10obWFyay5odG1sI2NvbmZpZykuICAqL1xuICBzdHlsZT86IFN0eWxlQ29uZmlnSW5kZXg7XG59XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0Q29uZmlnOiBDb25maWcgPSB7XG4gIHBhZGRpbmc6IDUsXG4gIHRpbWVGb3JtYXQ6ICclYiAlZCwgJVknLFxuICBjb3VudFRpdGxlOiAnTnVtYmVyIG9mIFJlY29yZHMnLFxuXG4gIGludmFsaWRWYWx1ZXM6ICdmaWx0ZXInLFxuXG4gIHZpZXc6IGRlZmF1bHRWaWV3Q29uZmlnLFxuXG4gIG1hcms6IG1hcmsuZGVmYXVsdE1hcmtDb25maWcsXG4gIGFyZWE6IHt9LFxuICBiYXI6IG1hcmsuZGVmYXVsdEJhckNvbmZpZyxcbiAgY2lyY2xlOiB7fSxcbiAgZ2Vvc2hhcGU6IHt9LFxuICBsaW5lOiB7fSxcbiAgcG9pbnQ6IHt9LFxuICByZWN0OiB7fSxcbiAgcnVsZToge2NvbG9yOiAnYmxhY2snfSwgLy8gTmVlZCB0aGlzIHRvIG92ZXJyaWRlIGRlZmF1bHQgY29sb3IgaW4gbWFyayBjb25maWdcbiAgc3F1YXJlOiB7fSxcbiAgdGV4dDoge2NvbG9yOiAnYmxhY2snfSwgLy8gTmVlZCB0aGlzIHRvIG92ZXJyaWRlIGRlZmF1bHQgY29sb3IgaW4gbWFyayBjb25maWdcbiAgdGljazogbWFyay5kZWZhdWx0VGlja0NvbmZpZyxcbiAgdHJhaWw6IHt9LFxuXG4gIGJveDoge3NpemU6IDE0LCBleHRlbnQ6IDEuNX0sXG4gIGJveFdoaXNrZXI6IHt9LFxuICBib3hNaWQ6IHtjb2xvcjogJ3doaXRlJ30sXG5cbiAgc2NhbGU6IGRlZmF1bHRTY2FsZUNvbmZpZyxcbiAgcHJvamVjdGlvbjoge30sXG4gIGF4aXM6IHt9LFxuICBheGlzWDoge30sXG4gIGF4aXNZOiB7bWluRXh0ZW50OiAzMH0sXG4gIGF4aXNMZWZ0OiB7fSxcbiAgYXhpc1JpZ2h0OiB7fSxcbiAgYXhpc1RvcDoge30sXG4gIGF4aXNCb3R0b206IHt9LFxuICBheGlzQmFuZDoge30sXG4gIGxlZ2VuZDogZGVmYXVsdExlZ2VuZENvbmZpZyxcblxuICBzZWxlY3Rpb246IGRlZmF1bHRTZWxlY3Rpb25Db25maWcsXG4gIHN0eWxlOiB7fSxcblxuICB0aXRsZToge30sXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdENvbmZpZyhjb25maWc6IENvbmZpZykge1xuICByZXR1cm4gbWVyZ2VEZWVwKGR1cGxpY2F0ZShkZWZhdWx0Q29uZmlnKSwgY29uZmlnKTtcbn1cblxuY29uc3QgTUFSS19TVFlMRVMgPSBbJ3ZpZXcnXS5jb25jYXQoUFJJTUlUSVZFX01BUktTLCBDT01QT1NJVEVfTUFSS19TVFlMRVMpIGFzICgndmlldycgfCBNYXJrIHwgQ29tcG9zaXRlTWFya1N0eWxlKVtdO1xuXG5cbmNvbnN0IFZMX09OTFlfQ09ORklHX1BST1BFUlRJRVM6IChrZXlvZiBDb25maWcpW10gPSBbXG4gICdwYWRkaW5nJywgJ251bWJlckZvcm1hdCcsICd0aW1lRm9ybWF0JywgJ2NvdW50VGl0bGUnLFxuICAnc3RhY2snLCAnc2NhbGUnLCAnc2VsZWN0aW9uJywgJ2ludmFsaWRWYWx1ZXMnLFxuICAnb3ZlcmxheScgYXMga2V5b2YgQ29uZmlnIC8vIEZJWE1FOiBSZWRlc2lnbiBhbmQgdW5oaWRlIHRoaXNcbl07XG5cbmNvbnN0IFZMX09OTFlfQUxMX01BUktfU1BFQ0lGSUNfQ09ORklHX1BST1BFUlRZX0lOREVYID0ge1xuICB2aWV3OiBbJ3dpZHRoJywgJ2hlaWdodCddLFxuICAuLi5WTF9PTkxZX01BUktfU1BFQ0lGSUNfQ09ORklHX1BST1BFUlRZX0lOREVYLFxuICAuLi5WTF9PTkxZX0NPTVBPU0lURV9NQVJLX1NQRUNJRklDX0NPTkZJR19QUk9QRVJUWV9JTkRFWFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHN0cmlwQW5kUmVkaXJlY3RDb25maWcoY29uZmlnOiBDb25maWcpIHtcbiAgY29uZmlnID0gZHVwbGljYXRlKGNvbmZpZyk7XG5cbiAgZm9yIChjb25zdCBwcm9wIG9mIFZMX09OTFlfQ09ORklHX1BST1BFUlRJRVMpIHtcbiAgICBkZWxldGUgY29uZmlnW3Byb3BdO1xuICB9XG5cbiAgLy8gUmVtb3ZlIFZlZ2EtTGl0ZSBvbmx5IGF4aXMvbGVnZW5kIGNvbmZpZ1xuICBpZiAoY29uZmlnLmF4aXMpIHtcbiAgICBmb3IgKGNvbnN0IHByb3Agb2YgVkxfT05MWV9HVUlERV9DT05GSUcpIHtcbiAgICAgIGRlbGV0ZSBjb25maWcuYXhpc1twcm9wXTtcbiAgICB9XG4gIH1cbiAgaWYgKGNvbmZpZy5sZWdlbmQpIHtcbiAgICBmb3IgKGNvbnN0IHByb3Agb2YgVkxfT05MWV9HVUlERV9DT05GSUcpIHtcbiAgICAgIGRlbGV0ZSBjb25maWcubGVnZW5kW3Byb3BdO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJlbW92ZSBWZWdhLUxpdGUgb25seSBnZW5lcmljIG1hcmsgY29uZmlnXG4gIGlmIChjb25maWcubWFyaykge1xuICAgIGZvciAoY29uc3QgcHJvcCBvZiBWTF9PTkxZX01BUktfQ09ORklHX1BST1BFUlRJRVMpIHtcbiAgICAgIGRlbGV0ZSBjb25maWcubWFya1twcm9wXTtcbiAgICB9XG4gIH1cblxuICBmb3IgKGNvbnN0IG1hcmtUeXBlIG9mIE1BUktfU1RZTEVTKSB7XG4gICAgLy8gUmVtb3ZlIFZlZ2EtTGl0ZS1vbmx5IG1hcmsgY29uZmlnXG4gICAgZm9yIChjb25zdCBwcm9wIG9mIFZMX09OTFlfTUFSS19DT05GSUdfUFJPUEVSVElFUykge1xuICAgICAgZGVsZXRlIGNvbmZpZ1ttYXJrVHlwZV1bcHJvcF07XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIFZlZ2EtTGl0ZSBvbmx5IG1hcmstc3BlY2lmaWMgY29uZmlnXG4gICAgY29uc3QgdmxPbmx5TWFya1NwZWNpZmljQ29uZmlncyA9IFZMX09OTFlfQUxMX01BUktfU1BFQ0lGSUNfQ09ORklHX1BST1BFUlRZX0lOREVYW21hcmtUeXBlXTtcbiAgICBpZiAodmxPbmx5TWFya1NwZWNpZmljQ29uZmlncykge1xuICAgICAgZm9yIChjb25zdCBwcm9wIG9mIHZsT25seU1hcmtTcGVjaWZpY0NvbmZpZ3MpIHtcbiAgICAgICAgZGVsZXRlIGNvbmZpZ1ttYXJrVHlwZV1bcHJvcF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmVkaXJlY3QgbWFyayBjb25maWcgdG8gY29uZmlnLnN0eWxlIHNvIHRoYXQgbWFyayBjb25maWcgb25seSBhZmZlY3QgaXRzIG93biBtYXJrIHR5cGVcbiAgICAvLyB3aXRob3V0IGFmZmVjdGluZyBvdGhlciBtYXJrcyB0aGF0IHNoYXJlIHRoZSBzYW1lIHVuZGVybHlpbmcgVmVnYSBtYXJrcy5cbiAgICAvLyBGb3IgZXhhbXBsZSwgY29uZmlnLnJlY3Qgc2hvdWxkIG5vdCBhZmZlY3QgYmFyIG1hcmtzLlxuICAgIHJlZGlyZWN0Q29uZmlnKGNvbmZpZywgbWFya1R5cGUpO1xuICB9XG5cbiAgLy8gUmVkaXJlY3QgY29uZmlnLnRpdGxlIC0tIHNvIHRoYXQgdGl0bGUgY29uZmlnIGRvIG5vdFxuICAvLyBhZmZlY3QgaGVhZGVyIGxhYmVscywgd2hpY2ggYWxzbyB1c2VzIGB0aXRsZWAgZGlyZWN0aXZlIHRvIGltcGxlbWVudC5cbiAgcmVkaXJlY3RDb25maWcoY29uZmlnLCAndGl0bGUnLCAnZ3JvdXAtdGl0bGUnKTtcblxuICAvLyBSZW1vdmUgZW1wdHkgY29uZmlnIG9iamVjdHNcbiAgZm9yIChjb25zdCBwcm9wIGluIGNvbmZpZykge1xuICAgIGlmIChpc09iamVjdChjb25maWdbcHJvcF0pICYmIGtleXMoY29uZmlnW3Byb3BdKS5sZW5ndGggPT09IDApIHtcbiAgICAgIGRlbGV0ZSBjb25maWdbcHJvcF07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGtleXMoY29uZmlnKS5sZW5ndGggPiAwID8gY29uZmlnIDogdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiByZWRpcmVjdENvbmZpZyhjb25maWc6IENvbmZpZywgcHJvcDogTWFyayB8IENvbXBvc2l0ZU1hcmtTdHlsZSB8ICd0aXRsZScgfCAndmlldycsIHRvUHJvcD86IHN0cmluZykge1xuICBjb25zdCBwcm9wQ29uZmlnOiBWZ01hcmtDb25maWcgPSBwcm9wID09PSAndGl0bGUnID8gZXh0cmFjdFRpdGxlQ29uZmlnKGNvbmZpZy50aXRsZSkubWFyayA6IGNvbmZpZ1twcm9wXTtcblxuICBpZiAocHJvcCA9PT0gJ3ZpZXcnKSB7XG4gICAgdG9Qcm9wID0gJ2NlbGwnOyAvLyBWaWV3J3MgZGVmYXVsdCBzdHlsZSBpcyBcImNlbGxcIlxuICB9XG5cbiAgY29uc3Qgc3R5bGU6IFZnTWFya0NvbmZpZyA9IHtcbiAgICAuLi5wcm9wQ29uZmlnLFxuICAgIC4uLmNvbmZpZy5zdHlsZVtwcm9wXVxuICB9O1xuICAvLyBzZXQgY29uZmlnLnN0eWxlIGlmIGl0IGlzIG5vdCBhbiBlbXB0eSBvYmplY3RcbiAgaWYgKGtleXMoc3R5bGUpLmxlbmd0aCA+IDApIHtcbiAgICBjb25maWcuc3R5bGVbdG9Qcm9wIHx8IHByb3BdID0gc3R5bGU7XG4gIH1cbiAgZGVsZXRlIGNvbmZpZ1twcm9wXTtcbn1cbiJdfQ==