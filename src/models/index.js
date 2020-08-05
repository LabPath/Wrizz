import { Sequelize, DataTypes } from 'sequelize'
import { Settings } from './settings'
import { Tags } from './tags'
import { Reminders } from './reminders'

export const sequelize = new Sequelize(process.env.POSTGRESQL_URI, { logging: false, timezone: 'est' })

export const settings = Settings(sequelize, DataTypes)
export const tags = Tags(sequelize, DataTypes)
export const reminders = Reminders(sequelize, DataTypes)