/**
 * jquery.scrollpaging
 * jquery scroll paging component.
 *
 * xiegang.1988@gmail.com
 */
(function($) {
    var ScrollPaging = function(opts, $this) {
        // 初始化内部状态
        $.extend(this, opts);
        this.$ele = $this;
        this.page = this.start;
        // 已经主动加载次数
        this.activeNum = 0;
        this.hasMore = true;
        this.isLoading = false;

        // register event
        var _this = this;
        $(window).scroll(function() {
            _this._scroll();
        });

        this.renderMore();
    }

    ScrollPaging.prototype = {
        _scroll: function() {
            var needLoad = this.activeNum < this.active
                && ($(window).scrollTop() + $(window).height() >= this.$ele.offset().top + this.$ele.height());

            if (needLoad) {
                this.paging();
            }
        },

        paging: function() {
            if (!this.isLoading && this.hasMore) {
                this.isLoading = true;
                this.onLoading();

                var _this = this;
                $.ajax({
                    url: this.buildRequestUrl(),
                    dataType: 'json',
                    success: function (data, textStatus, jqXHR) {
                        _this.page += 1;
                        _this.activeNum += 1;
                        _this.onUpdate(data, textStatus, jqXHR); // 更新内部状态
                        _this.onSuccess(data, textStatus, jqXHR); // 成功回调
                    },
                    error: this.onError,
                    complete: function (xhr, textStatus) {
                        _this.isLoading = false;
                        _this.renderMore();

                        _this.onComplete(xhr, textStatus);
                    }
                });
            }
        },

        onLoading: function() {
            var more = this.$ele.children('.' + this.more.class);
            more.length && more.html(this.more.loading);
        },

        renderMore: function() {
            var _this = this;
            if (this.more.every || !this.hasMore || this.activeNum >= this.active) {
                // generate more element
                var more = this.$ele.children('.' + this.more.class);
                if (!more.length) {
                    more = $('<div class="' + this.more.class + '"></div>');
                    this.$ele.append(more);
                }

                // generate content
                // more
                if (this.hasMore) {
                    var $element = $(this.more.element);
                    $element.html(this.more.content);
                    $element.click(function () {
                        _this.paging();
                    });
                    more.html($element);
                } else {
                    // finish
                    more.html(this.more.finish);
                }
            }
        },

        // 构建当前状态的请求路径
        buildRequestUrl: function() {
            var url = this.url;
            if (this.style === 'rest') {
               url = url.charAt(this.url.length - 1) === '/' ? url : url + '/';
            } else {
                // classic
                url = url.indexOf('?') >= 0 ? url + '&page=' : url + '?page=';
            }
            return url + this.page;
        }
    }

    $.fn.scrollpaging = function(options) {
        var opts = $.extend({}, $.fn.scrollpaging.defaults, options);

        // scrollpagings
        var sps = [];
        this.each(function () {
            sps.push(new ScrollPaging(opts, $(this)));
        });

        return sps.length > 0 ? (sps.length === 1 ? sps[0] : sps) : null;
    }

    $.fn.scrollpaging.defaults = {
        url: "",
        // 第一次触发加载时请求的分页页码
        start: 2,
        // 主动触发次数
        active: 10,
        // 请求风格classic or rest
        style: "classic",
        // 更多按钮
        more: {
            // 一直存在还是不主动触发以后再显示
            every: true,
            class: "scrollpaging",
            loading: "正在加载...",
            finish: "没有数据了",
            element: "<a class=\"more\" href=\"javascript:;\"></a>",
            content: "更多"
        },
        // event
        onLoading: ScrollPaging.prototype.onLoading,
        onUpdate: function(){},
        onSuccess: function(){},
        onError: function(){},
        onComplete: function(){}
    }
})(jQuery);