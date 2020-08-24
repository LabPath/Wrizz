import { Sequelize, DataTypes } from 'sequelize'

export const sequelize = new Sequelize(process.env.POSTGRESQL_URI, { logging: false, timezone: 'est' })

import { Tags } from './tags'
import { Players } from './players'
import { Settings } from './settings'
import { Reminders } from './reminders'
import { Suggestions } from './suggestions'

export const tags = Tags(sequelize, DataTypes)
export const players = Players(sequelize, DataTypes)
export const settings = Settings(sequelize, DataTypes)
export const reminders = Reminders(sequelize, DataTypes)
export const suggestions = Suggestions(sequelize, DataTypes)