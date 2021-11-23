<template>
    <div class="d-flex align-center">
        <div class="price-value">${{ value }} CAD</div>
        <div class="price-per">/ night</div>
    </div>
</template>
<script>
export default {
    props: {
        value: {
            type: Number,
            default: null,
        }
    }
}
</script>

<style lang="scss" scoped>
.price-value {
    color: $grey-text;
    font-weight: 500;
    font-size: 20px;
    margin-right: 5px;
}
.price-per {
    color: $grey-text-light;
    font-size: 16px;
}
</style>