<template>
    <div class="carousel-3d-controls">
        <a href="#" class="prev" @click.prevent="parent.goPrev()"
           :class="{ disabled: !parent.isPrevPossible }">&lsaquo;</a>
        <a href="#" class="next" @click.prevent="parent.goNext()"
           :class="{ disabled: !parent.isNextPossible }">&rsaquo;</a>
    </div>
</template>

<script>
    export default {
        name: 'controls',
        data () {
            return {
                parent: this.$parent
            }
        }
    }
</script>

<style scoped>
    .carousel-3d-controls {
        position: absolute;
        top: 30%;
        left: 0;
        width: 100%;
        z-index: 9099;
    }

    .next, .prev {
        width: 60px;
        position: absolute;
        z-index: 9999;
        font-size: 60px;
        line-height: 60px;
        color: #333;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        text-decoration: none;
    }

    .next:hover, .prev:hover {
        cursor: pointer;
        opacity: 0.7;
    }

    .prev {
        top: 15px;
        left: 10px;
    }

    .next {
        top: 15px;
        right: 10px;
    }

    .disabled {
        opacity: 0.2;
        cursor: default;
    }

    .disabled:hover {
        cursor: default;
        opacity: 0.2;
    }
</style>
