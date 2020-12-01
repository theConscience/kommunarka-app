/* eslint-disable no-console */

const os = require('os')
const fs = require('fs')
const path = require('path')

const { fstat } = require('fs')
const csv = require('csvtojson')

const csvPath = './victims.csv'
const groupByFirstLetter = {
  'а': [],
  'б': [],
  'в': [],
  'г': [],
  'д': [],
  'е': [],
  'ё': [],
  'ж': [],
  'з': [],
  'и': [],
  'й': [],
  'к': [],
  'л': [],
  'м': [],
  'н': [],
  'о': [],
  'п': [],
  'р': [],
  'с': [],
  'т': [],
  'у': [],
  'ф': [],
  'х': [],
  'ц': [],
  'ч': [],
  'ш': [],
  'щ': [],
  'ъ': [],
  'ы': [],
  'ь': [],
  'э': [],
  'ю': [],
  'я': [],
}
const saveDir = './content/victims/'

csv()
  .fromFile(csvPath)
  .then((jsonObj) => {
    console.log('jsonObj:\n', jsonObj)
    return jsonObj.reduce((acc, victim) => {
      const firstNameLetter = victim.first_name[0].toLowerCase()
      victim.id = parseInt(victim.id)
      acc[firstNameLetter].push(victim)
      return acc
    }, groupByFirstLetter)
  })
  .then((victimGroupsObj) => {
    console.log('victimGroupsObj:', victimGroupsObj)
    const promises = Object.entries(victimGroupsObj).map(([group, victims]) => {
      return new Promise((resolve, reject) => {
        fs.writeFile(
          saveDir + group + '.json',
          JSON.stringify(victims),
          'utf-8',
          (err) => {
            if (err) {
              console.warn('File not saved because of err:', err)
              reject(err)
            } else {
              console.log('group', group, 'saved')
              resolve(group)
            }
          }
        )
      })
    })

    return Promise.all(promises)
  })
  .then((savedArr) => console.log('saved array is:', savedArr))
