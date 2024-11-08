<template>
    <div class="custom-select-wrap">
		<div class="label" :style="{ color: labelColor }">
			{{ label }}
		</div>
        <select :value="modelValue" :disabled="disabled" @change="$emit('update:model-value', $event.target.value)">
            <option
				v-for="(item, index) in items"
				:key="index"
				:value="item.value"
				:selected="item.value == modelValue"
			>
				{{ item.text }}
			</option>
        </select>
    </div>
</template>

<script>
export default {
    name: "Select",
    props: {
		label: {
			type: String,
			default: ''
		},
        labelColor: {
            type: String,
            default: '#898989'
        },
        modelValue: {
            type: String,
			default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        items: {
            type: Array,
            default: () => ([]),
        }
    }
}
</script>
<style lang="scss" scoped>
.custom-select-wrap{
    select{
        border: 1px solid #989898;
        border-radius: 10px;
        display: block;
        padding: 10px 20px;
        // width: calc(100% - 40px);
        width: 100%;
        height: 40px;
        // margin-bottom: 15px;
		&:focus{
			border: 1px solid #F36F21; 
		}
		&:focus-visible{
			border: 1px solid #F36F21;
            outline: none;
		}
    }
	.label{
		font-size: 14px;
	}
}

</style>
