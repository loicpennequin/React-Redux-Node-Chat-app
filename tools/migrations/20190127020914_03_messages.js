exports.up = function(knex, Promise) {
    return knex.schema.createTable('messages', table => {
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
        table.string('body').notNullable();
        table
            .boolean('is_read')
            .notNullable()
            .defaultTo(false);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('messages');
};
