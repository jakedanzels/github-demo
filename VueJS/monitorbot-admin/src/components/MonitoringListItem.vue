<template>
    <li>
        <h3>{{ monitoringItem.name }}</h3>
        {{ monitoringItem.description }}
    </li>
</template>

<script>
export default {
    data() {
        return {
            monitoringItem:
            {
            id: 1,
            name: 'Check 1',
            description: 'Checks the thing',
            SQLStatement: 'SELECT Problem FROM dbo.Table Where Problem = Problem;'
            }
        }
    }
}
</script>