/**
 * @fileOverview Image帮助类，主要用来生成缩略图和压缩图片。
 * @import base.js, runtime/client.js
 */
define( 'webuploader/lib/imagepreview', [ 'webuploader/base',
        'webuploader/runtime/client' ],
        function( Base, RuntimeClient ) {
    var $ = Base.$;

    function ImagePreview( opts ) {
        this.options = $.extend( {}, Image.options, opts );
        RuntimeClient.call( this, 'ImagePreview' );
    }

    ImagePreview.options = {
        quality: 90,
        crop: false,
        allowMagnify: false
    };

    Base.inherits( RuntimeClient, {
        constructor: ImagePreview,

        preview: function( blob, width, height ) {
            var me = this,
                ruid = blob.getRuid();

            this.connectRuntime( ruid, function() {
                me.exec( 'init', me.options );
                me.exec( 'preview', blob, width, height );
            });
        },

        getAsDataURL: function() {
            return this.exec( 'getAsDataURL' );
        },

        getOrientation: function() {
            return this.exec( 'getOrientation' );
        },

        getMetas: function() {
            return this.exec( 'getMetas' );
        },

        destroy: function() {
            this.trigger( 'destroy' );
            this.off();
            this.exec( 'destroy' );
        }
    } );

    return ImagePreview;
} );