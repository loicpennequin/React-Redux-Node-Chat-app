exports.up = function(knex, Promise) {
    return knex.schema.createTable('contacts', table => {
        table.increments().primary();
        table.timestamps();
        table
            .integer('sender_id')
            .notNullable()
            .unsigned()
            .references('users.id')
            .onDelete('CASCADE');
        table
            .integer('sendee_id')
            .notNullable()
            .unsigned()
            .references('users.id')
            .onDelete('CASCADE');
        table
            .integer('status')
            .notNullable()
            .defaultTo(0);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('contacts');
};
