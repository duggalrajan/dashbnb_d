<template>
    <button class="dh-button">
        <slot/>
    </button>
</template>

<style lang="scss" scoped>
.dh-button {
    font-size: 14px;
    font-weight: 500;
    color: $white;
    border-radius: 20px;
    background-color: $gold;
    width: 175px;
    height: 32px;
}
</style>