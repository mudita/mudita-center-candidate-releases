import Faker from "faker"
import { groupBy, times, random } from "lodash"
import { generateFakeContact } from "Renderer/models/phone/phone.utils"
import { Author } from "Renderer/models/messages/messages.interface"

const createText = () => ({
  id: Faker.random.uuid(),
  text: Faker.lorem.paragraphs(random(1, 3)),
})

export const notes = times(random(15, 25), createText)

const generateEmptyContact = (): Author => ({
  id: Faker.random.uuid(),
  firstName: "",
  lastName: "",
  primaryPhoneNumber: Faker.phone.phoneNumber("+## ### ### ###"),
})

const createAuthor = (inContacts: boolean): Author => {
  return inContacts ? generateFakeContact() : generateEmptyContact()
}

const createMessages = (author: Author) => {
  const interlocutor = Faker.random.boolean()
  return {
    author: interlocutor
      ? author
      : {
          id: "123",
          firstName: "John",
          lastName: "Doe",
          primaryPhoneNumber: "123 123 123",
        },
    id: Faker.random.uuid(),
    date: String(Faker.date.past()),
    content: Faker.lorem.sentences(2),
    interlocutor,
  }
}

const createTopic = () => {
  const inContacts = Faker.random.boolean()
  const caller = createAuthor(inContacts)
  const createMessagesWithAuthor = () => createMessages(caller)
  return {
    id: Faker.random.uuid(),
    caller,
    unread: Faker.random.boolean(),
    messages: times(random(5, 15), createMessagesWithAuthor),
  }
}

export const rowsMessages = times(random(5, 15), createTopic)

export const basicRows = Array.from({
  length: Math.round(15 + Math.random() * 25),
}).map(() => {
  const firstName = Faker.name.firstName()
  return {
    firstName,
    lastName: Faker.name.lastName(),
    phoneNumber: Faker.phone.phoneNumber(),
    address: {
      zip: Faker.address.zipCode(),
      city: Faker.address.city(),
      country: Faker.address.country(),
    },
  }
})

export const nestedRows = [
  {
    fileType: "Messages",
    lastBackup: Faker.date.past(),
    size: `${Faker.random.number(64)}.${Faker.random.number(
      9
    )}${Faker.random.number(9)} MB`,
  },
  {
    fileType: "Contacts",
    lastBackup: Faker.date.past(),
    size: `${Faker.random.number(64)}.${Faker.random.number(
      9
    )}${Faker.random.number(9)} MB`,
  },
  {
    fileType: "Files",
    lastBackup: Faker.date.past(),
    size: `${Faker.random.number(64)}.${Faker.random.number(
      9
    )}${Faker.random.number(9)} MB`,
    _children: [
      {
        fileType: "Music files",
        lastBackup: Faker.date.past(),
        size: `${Faker.random.number(64)}.${Faker.random.number(
          9
        )}${Faker.random.number(9)} MB`,
      },
      {
        fileType: "Recorded files",
        lastBackup: Faker.date.past(),
        size: `${Faker.random.number(64)}.${Faker.random.number(
          9
        )}${Faker.random.number(9)} MB`,
      },
      {
        fileType: "Storage files",
        lastBackup: Faker.date.past(),
        size: `${Faker.random.number(64)}.${Faker.random.number(
          9
        )}${Faker.random.number(9)} MB`,
      },
    ],
  },
  {
    fileType: "Notes",
    lastBackup: Faker.date.past(),
    size: `${Faker.random.number(64)}.${Faker.random.number(
      9
    )}${Faker.random.number(9)} MB`,
  },
  {
    fileType: "Meditation timer data",
    lastBackup: Faker.date.past(),
    size: `${Faker.random.number(64)}.${Faker.random.number(
      9
    )}${Faker.random.number(9)} MB`,
  },
]

export const sortedBasicRows = [...basicRows].sort((a, b) => {
  return a.firstName > b.firstName ? 1 : -1
})

export const labeledRows = groupBy(sortedBasicRows, row =>
  row.firstName.charAt(0)
)
