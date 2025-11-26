<script setup>
import { ref, reactive, computed } from 'vue';
import Alert from './Alert.vue';



const alerta = reactive({
    tipo: '',
    mensaje: '',
})

const validar = () => {
    if (Object.values(props).includes('')) {
        alerta.mensaje = 'Todos los campos son obligatorios'
        alerta.tipo = 'error'
        return
    }

    emit('guardar-paciente')
    alerta.mensaje = 'Paciente Almacenado Correctamente'
    alerta.tipo = 'exito'

    setTimeout(() => {
        Object.assign(alerta, {
            mensaje: "",
            tipo: ""
        })
    }, 3000)

}



const emit = defineEmits(['update:nombre', 'update:propietario', 'update:email', 'update:alta', 'update:sintomas', 'guardar-paciente'])

const props = defineProps({
    nombre: {
        type: String,
        required: true
    },
    propietario: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    alta: {
        type: String,
        required: true
    },
    sintomas: {
        type: String,
        required: true
    },
    id: {
        type: [String, null],
        required: true
    }
})

const editando = computed(() => {
    return props.id
})


</script>

<template>
    <div class="md:w-1/2">
        <h2 class="font-black text-3xl text-center">Seguimiento pacientes</h2>
        <Alert :alerta="alerta" v-if="alerta.mensaje" />
        <form @submit.prevent="validar" class="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
            <!--MASCOTA-->
            <div class="mb-5">
                <label for="mascota" class="block text-gray-700 uppercase font-bold">
                    Nombre Mascota
                </label>
                <input @input="$emit('update:nombre', $event.target.value)" id="mascota" type="text" :value="nombre"
                    placeholder="Nombre de la mascota"
                    class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md border-gray-400">
            </div>
            <!--PROPIETARIO-->
            <div class="mb-5">
                <label for="propietario" class="block text-gray-700 uppercase font-bold">
                    Nombre Propietario
                </label>
                <input @input="$emit('update:propietario', $event.target.value)" id="propietario" type="text"
                    :value="propietario" placeholder="Nombre del propietario"
                    class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md border-gray-400">
            </div>
            <!--EMAIL-->
            <div class="mb-5">
                <label for="email" class="block text-gray-700 uppercase font-bold">
                    Email
                </label>
                <input @input="$emit('update:email', $event.target.value)" id="email" type="email" placeholder="Email"
                    :value="email" class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md border-gray-400">
            </div>
            <!--FECHA ALTA-->
            <div class="mb-5">
                <label for="alta" class="block text-gray-700 uppercase font-bold">
                    Fecha Alta
                </label>
                <input @input="$emit('update:alta', $event.target.value)" id="alta" type="date" :value="alta"
                    placeholder="Fecha de alta"
                    class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md border-gray-400">
            </div>

            <!--SINTOMAS-->
            <div class="mb-5">
                <label for="sintomas" class="block text-gray-700 uppercase font-bold">
                    Síntomas
                </label>
                <textarea @input="$emit('update:sintomas', $event.target.value)" id="sintomas" :value="sintomas"
                    placeholder="Describe los sintomas"
                    class="h-40 border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md border-gray-400" />
            </div>
            <input type="submit"
                class="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-800 cursor-pointer transition-colors"
                :value="editando ? 'Guardar Cambios' : 'Registrar paciente'">
        </form>
    </div>
</template>


<style lang="scss" scoped></style>