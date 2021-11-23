<template>
    <div class="summary-list">
        <template v-for="(item, index) in items">
            <span :key="item">
                <span v-if="index !== 0">/</span>
                {{ item }}
            </span>
        </template>
    </div>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            default: () => []
        }
    }
}
</script>

<style lang="scss" scoped>
.summary-list {
    color: $grey-text-light;
    font-size: 16px;
}
</style>