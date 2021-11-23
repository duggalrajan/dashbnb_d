<template>
    <div v-if="value" class="d-flex align-center">
        <div class="star-icon">
            <img src="@/assets/icons/star.svg" />
        </div>
        <div class="rating-value">
            {{ value }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Number,
            default: null,
        }
    },
}
</script>

<style lang="scss" scoped>
.star-icon {
    margin-right: 5px;
}
.rating-value {
    color: $grey-text;
    font-size: 16px;
}
</style>