<template>
    <div class="custom-checkbox-wrap">
        <input
            :value="value"
            type="checkbox"
            :disabled="disabled"
            :name="name"
            :id="randomId"
            v-model="model"
        >
        <label class="custom-checkbox-label" :for="randomId">
            <div class="rectangle" :class="[model?'active':'']" />
            <div>
                {{ label }}
            </div>
        </label>
    </div>
</template>

<script>
export default {
    name: 'form_checkbox',
	props: {
		label: {
			type: String,
			default: ''
		},
		name: {
			type: String,
			default: ''
		},
        modelValue: { type: [Array, Boolean, Number] },
        value: { type: [Boolean, Object, Number] },
		disabled: {
			type: Boolean,
			default: false
		}
	},
    computed: {
        randomId () {
            const length = 10
            let rnd = '';
            while (rnd.length < length) 
                rnd += Math.random().toString(36).substring(2);
            return rnd.substring(0, length);
        },
        model:{
            get() {
                return this.modelValue?true:false;
            },
            set(value) {
                this.$emit("update:modelValue", value);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../css/variables.scss';
.custom-checkbox-wrap{
    margin: 6px 0;
    input{
        display: none;
    }
}
.custom-checkbox-label{
	font-size: 14px;
	margin-bottom: 2px;
    display: flex;
    gap: 4px;
    align-items: center;
    .rectangle{
        width: 12px;
        height: 12px;
        border-radius: 4px;
        border: solid 2px $blue-color;
        position: relative;
        &.active{
            background-color: $blue-color;
            &:after{
                content: '';
                position: absolute;
                width: 10px;
                height: 10px;
                display: block;
                border-radius: 2px;
                border: solid 1px $white-color;
            }
        }
    }
}

</style>