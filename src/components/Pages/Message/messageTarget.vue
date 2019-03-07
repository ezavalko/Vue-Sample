<template>
    <div class="target-item">
        <p class="name">{{object.name}}</p>
        <p class="position pale">{{object.position}}</p>
        <p class="description pale">{{object.description}}</p>
        <p class="description pale">Email</p>
        <p class="item">{{object.email}}</p>
        <p class="description pale">Phone</p>
        <p class="item">{{object.phone}}</p>
        <p class="description pale">Adress</p>
        <p class="item">{{object.adress}}</p>
        <p class="description pale">Organisation</p>
        <p class="item">{{object.organisation}}</p>
    </div>
</template>

<script>
    export default {
        name: "messageTarget",
        data(){
            return{
            }
        },
        props:['object']
    }
</script>

<style scoped lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Montserrat:300,400,700');

    .target-item{
        text-align: center;

        .name{
            font-size: 22px;
            margin-bottom: 0;
        }

        .position{
            margin-top: 5px;
            font-size: 16px;
        }

        .description{
            font-size: 14px;
            letter-spacing: 0.42px;
        }

        p{
            color: white;
        }

        .pale{
            color: #9ca1b2;
        }

        .item{
            margin-top: -10px;
        }
    }
</style>