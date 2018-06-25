import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { ClusterManager } from '../services/managers/cluster-manager';
import { MarkerManager, InfoWindowManager } from '@agm/core';
/**
 * AgmMarkerCluster clusters map marker if they are near together
 *
 * ### Example
 * ```typescript
 * import { Component } from '@angular/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *    agm-map {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <agm-marker-cluster>
 *        <agm-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
 *        </agm-marker>
 *        <agm-marker [latitude]="lat2" [longitude]="lng2" [label]="'N'">
 *        </agm-marker>
 *      </agm-marker-cluster>
 *    </agm-map>
 *  `
 * })
 * ```
 */
var AgmMarkerCluster = /** @class */ (function () {
    function AgmMarkerCluster(_clusterManager) {
        this._clusterManager = _clusterManager;
        this.clusterClick = new EventEmitter();
        this._observableSubscriptions = [];
    }
    /** @internal */
    AgmMarkerCluster.prototype.ngOnDestroy = function () {
        this._clusterManager.clearMarkers();
        this._observableSubscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    /** @internal */
    AgmMarkerCluster.prototype.ngOnChanges = function (changes) {
        if (changes['gridSize']) {
            this._clusterManager.setGridSize(this);
        }
        if (changes['maxZoom']) {
            this._clusterManager.setMaxZoom(this);
        }
        if (changes['styles']) {
            this._clusterManager.setStyles(this);
        }
        if (changes['zoomOnClick']) {
            this._clusterManager.setZoomOnClick(this);
        }
        if (changes['averageCenter']) {
            this._clusterManager.setAverageCenter(this);
        }
        if (changes['minimumClusterSize']) {
            this._clusterManager.setMinimumClusterSize(this);
        }
        if (changes['styles']) {
            this._clusterManager.setStyles(this);
        }
        if (changes['imagePath']) {
            this._clusterManager.setImagePath(this);
        }
        if (changes['imageExtension']) {
            this._clusterManager.setImageExtension(this);
        }
    };
    AgmMarkerCluster.prototype._addEventListeners = function () {
        var _this = this;
        var handlers = [
            {
                name: 'clusterclick',
                handler: function (ev) { return _this.clusterClick.emit(ev); }
            },
        ];
        handlers.forEach(function (obj) {
            var os = _this._clusterManager.createClusterEventObservable(obj.name, _this).subscribe(obj.handler);
            _this._observableSubscriptions.push(os);
        });
    };
    /** @internal */
    AgmMarkerCluster.prototype.ngOnInit = function () {
        this._addEventListeners();
        this._clusterManager.init({
            gridSize: this.gridSize,
            maxZoom: this.maxZoom,
            zoomOnClick: this.zoomOnClick,
            averageCenter: this.averageCenter,
            minimumClusterSize: this.minimumClusterSize,
            styles: this.styles,
            imagePath: this.imagePath,
            imageExtension: this.imageExtension,
        });
    };
    AgmMarkerCluster.decorators = [
        { type: Directive, args: [{
                    selector: 'agm-marker-cluster',
                    providers: [
                        ClusterManager,
                        { provide: MarkerManager, useExisting: ClusterManager },
                        InfoWindowManager,
                    ]
                },] },
    ];
    /** @nocollapse */
    AgmMarkerCluster.ctorParameters = function () { return [
        { type: ClusterManager }
    ]; };
    AgmMarkerCluster.propDecorators = {
        gridSize: [{ type: Input }],
        maxZoom: [{ type: Input }],
        zoomOnClick: [{ type: Input }],
        averageCenter: [{ type: Input }],
        minimumClusterSize: [{ type: Input }],
        styles: [{ type: Input }],
        imagePath: [{ type: Input }],
        imageExtension: [{ type: Input }],
        clusterClick: [{ type: Output }]
    };
    return AgmMarkerCluster;
}());
export { AgmMarkerCluster };
//# sourceMappingURL=marker-cluster.js.map