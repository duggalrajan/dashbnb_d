<template>
    <div class="control-bar">
        <div class="control-bar-left">
          <slot />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: null,
        },
    },
}
</script>

<style lang="scss" scoped>
.control-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 40px;
    margin-bottom: 24px;

    .title {
        font-size: 20px;
        font-weight: normal;
        line-height: 1.25em;
    }
}
</style>
