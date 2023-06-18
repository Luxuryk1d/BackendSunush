const mongoose = require("mongoose");
const {nanoid} = require("nanoid");
const config = require("./config");
const Category = require('./models/Category');
const User = require('./models/User');
const Question = require("./models/Question");
const Answer = require("./models/Answer");
const Region = require("./models/Region");
const axios = require("axios");
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =
    "mongodb+srv://admin:12345@sl.lacxvio.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
        useNewUrlParser: true,
      },
});

const db = mongoose.connection;


db.once("open", async () => {
    try {
        await axios.delete("http://localhost:9200/_all");
        await db.dropCollection("categories");
        await db.dropCollection("questions");
        await db.dropCollection("answers");
        await db.dropCollection("users");
        await db.dropCollection("regions");
        await db.dropCollection("messages");
        await db.dropCollection("ratings");
        // await axios.delete("http://es:9200/_all");
    } catch (e) {
        console.log('Collections were not present, skipping drop...');
    }


    const [
        marriageAndFamily,
        citizenshipPassportRegistrationMigrationAndVisaIssues,
        trafficAccidentsRegistrationAndArrestOfACar,
        loansAndOtherIssuesWithBanks, doingBusinessChecksAndTaxes,
        inheritance, realEstateAndRent,
        registrationOfCommercialAndNonCommercialOrganizationsObtainingLicensesAndPermits,
        laborDisputes, disputesWithGovernmentBodies, criminalProceedings,
        accountingIssues, questionsToTheNotary, another,
    ] = await Category.create(
        {
            rusTitle: "Брак и семья",
            kgTitle: "Нике жана үй-бүлө",
            engTitle: "Marriage and family",
        }, {
            rusTitle: "Гражданство, паспорт, регистрация, миграционные и визовые вопросы",
            kgTitle: "Жарандык, паспорт, каттоо, миграция жана виза маселелери",
            engTitle: "Citizenship, passport, registration, migration and visa issues",
        }, {
            rusTitle: "ДТП, оформление и арест авто",
            kgTitle: "Кырсыктар, автоунааларды каттоо жана камакка алуу",
            engTitle: "Traffic accidents, registration and arrest of a car",
        }, {
            rusTitle: "Кредиты и другие вопросы с банками",
            kgTitle: "Банктар менен насыялар жана башка маселелер",
            engTitle: "Loans and other issues with banks",
        }, {
            rusTitle: "Ведение бизнеса, проверки и налоги",
            kgTitle: "Бизнес жүргүзүү, чектер жана салыктар",
            engTitle: "Doing business, checks and taxes",
        }, {
            rusTitle: "Наследство",
            kgTitle: "Мурас",
            engTitle: "Inheritance",
        }, {
            rusTitle: "Недвижимость и аренда",
            kgTitle: "Кыймылсыз мүлк жана ижара",
            engTitle: "Real estate and rent",
        }, {
            rusTitle: "Регистрация коммерческих и не коммерческих организаций, получение лицензий и разрешений",
            kgTitle: "Коммерциялык жана коммерциялык эмес уюмдарды каттоо, лицензияларды жана уруксат кагаздарын алуу",
            engTitle: "Registration of commercial and non-commercial organizations, obtaining licenses and permits",
        }, {
            rusTitle: "Трудовые споры",
            kgTitle: "Эмгек талаш-тартыштары",
            engTitle: "Labor disputes",
        }, {
            rusTitle: "Споры с государственными органами",
            kgTitle: "Мамлекеттик органдар менен талаш-тартыштар",
            engTitle: "Disputes with government bodies",
        }, {
            rusTitle: "Уголовные дела",
            kgTitle: "Кылмыш ишин козгоо",
            engTitle: "Criminal proceedings",
        }, {
            rusTitle: "Бухгалтерские вопросы",
            kgTitle: "Бухгалтердик эсеп маселелери",
            engTitle: "Accounting issues",
        }, {
            rusTitle: "Вопросы нотариусу",
            kgTitle: "Нотариуска суроолор",
            engTitle: "Questions to the notary",
        }, {
            rusTitle: "Другое",
            kgTitle: "Башка",
            engTitle: "Others",
        });


    const [
        Bishkek,
        Osh,
        ChuiRegion,
        BatkenRegion,
        JalalAbadRegion,
        NarynRegion,
        IssykKulRegion,
        OshRegion,
        TalasRegion] = await Region.create(
        {
            rusTitle: "Бишкек",
            kgTitle: "Бишкек",
            engTitle: "Bishkek",
        },
        {
            rusTitle: "Ош",
            kgTitle: "Ош",
            engTitle: "Osh",
        }, {
            rusTitle: "Чуйская область",
            kgTitle: "Чуй облусу",
            engTitle: "Chui region",
        }, {
            rusTitle: "Баткенская область",
            kgTitle: "Баткен облусу",
            engTitle: "Batken region",
        }, {
            rusTitle: "Джалал-Абадская область",
            kgTitle: "Джалал-Абад облусу",
            engTitle: "Jalal-Abad region",
        }, {
            rusTitle: "Нарынская область",
            kgTitle: "Нарын облусу",
            engTitle: "Naryn region",
        }, {
            rusTitle: "Иссык-Кульская область",
            kgTitle: "Ыссык-Кол облусу",
            engTitle: "Issyk-Kol region",
        }, {
            rusTitle: "Ошская область",
            kgTitle: "Ош облусу",
            engTitle: "Osh region",
        }, {
            rusTitle: "Таласская область",
            kgTitle: "Талас облусу",
            engTitle: "Talas region",
        });

    const [user, user2, admin,
        moderator] = await User.create(
        {
            phone: "555123456",
            password: "12345678Kk",
            token: nanoid(),
            role: "user",
            blocked: false,
            fullName: "Иван Иванов",
        }, {
            phone: "777123456",
            password: "12345678Kk",
            token: nanoid(),
            role: "user",
            blocked: false,
            fullName: "Антон Антонов",
        }, {
            phone: "111111111",
            password: "12345678Kk",
            token: nanoid(),
            role: "admin",
            fullName: "admin",
        }, {
            phone: "222222222",
            password: "12345678Kk",
            token: nanoid(),
            role: "moderator",
            fullName: "moderator",
        });
    const [
        realQuestion1,
        realQuestion2,
        realQuestion3,
        realQuestion4,
        realQuestion5,
        realQuestion6,
        realQuestion7,
        realQuestion8,
        realQuestion9,
        realQuestion10,
        realQuestion11,
        realQuestion12,
        realQuestion13,
        realQuestion14,
        realQuestion15,
    ] = await Question.create(
        ///___________Question_1
        {
            title: "Можно ли наказать по закону 16 летнего мальчика",
            description: "Можно ли наказать по закону 16 летнего мальчика, применял физическую силу за другого человека.",
            category: criminalProceedings._id,
            datetime: "Thu Dec 24 2020 20:23:05 GMT+0600 (Kyrgyzstan Time)",
            user: user._id,
            published: true,
            region: ChuiRegion._id,
            deleted: false,
            newId: "Eh_Hooq0Cwm2A1Haef7f1",
            answers: 1,
        },


        ///___________Question_2
        {
            title: "Может ли ребенок высказать свое мнение с кем проживать?",
            description: "Уважаемые юристы!\n" +
                "\n" +
                "В Российском законодательстве нашла четко прописанное, что ребенок принимает решение с кем ему проживать с 10 лет. В Киргизском законодательстве нет четкого ответа на этот вопрос. У нас он может принимать решение с 10 лет только по определенным статьям.\n" +
                "\n" +
                "Почему же тогда ребенка спрашивают только с 10 лет, а если ему 9 лет и он хочет проживать с папой? Почему его мнение не учитывается в этом возрасте?",
            category: marriageAndFamily._id,
            datetime: "Thu Dec 24 2020 20:24:05 GMT+0600 (Kyrgyzstan Time)",
            user: user2._id,
            published: true,
            region: OshRegion._id,
            deleted: false,
            newId: "Eh_Hooq0Cwm2A1Haef7f2",
            answers: 1,
        },


        ///___________Question_3
        {
            title: "Смогут ли забрать ребенка?",
            description: "Мой сын дальнобойщик. Его сынишка, мой внук, которому 9 лет, сейчас проживает с нами и категорически не хочет возвращаться к матери. Решения суда нет.\n" +
                "\n" +
                "Может ли мама моего внука забрать его у меня, пока мой сын в рейсе? Читала семейный кодекс КР и нашла, что только через суд, это так?",
            category: marriageAndFamily._id,
            datetime: "Thu Dec 24 2020 20:26:05 GMT+0600 (Kyrgyzstan Time)",
            user: user2._id,
            published: true,
            region: BatkenRegion._id,
            deleted: false,
            newId: "Eh_Hooq0Cwm2A1Haef7f3",
            answers: 1,
        },


        ///___________Question_4
        {
            title: "Наследство гражданам РФ дистанционно",
            description: "Здравствуйте!\n" +
                "\n" +
                "В 2014г умер дедушка, дом и земля были переоформлены на маму, она гражданка РФ, Мама умерла за 3 месяца до его смерти, у нас не было ещё документов на право на наследство мамы.\n" +
                "\n" +
                "Можем ли мы сейчас претендовать на дом и его продажу дистанционно?\n" +
                "\n" +
                "Благодарю за ответ.",
            category: inheritance._id,
            datetime: "Thu Dec 24 2020 20:27:05 GMT+0600 (Kyrgyzstan Time)",
            user: user._id,
            published: true,
            region: ChuiRegion._id,
            deleted: false,
            newId: "1h_Hooq0Cwm2A1Haef7f4",
            answers: 1,
        },


        ///___________Question_5
        {
            title: "Как продать дом и участок без документов",
            description: "Как продать дом без документов , с распиской через нотариуса можно?",
            category: realEstateAndRent._id,
            datetime: "Thu Dec 24 2020 20:28:05 GMT+0600 (Kyrgyzstan Time)",
            user: user2._id,
            published: true,
            region: OshRegion._id,
            deleted: false,
            newId: "2h_Hooq0Cwm2A1Haef7f5",
            answers: 1
        },


        ///___________Question_6
        {
            title: "Влияние cмены фамилии родителем на свидетельство о рождении ребёнка",
            description: "Я улетела в США по визе невесты к-1 и беру фамилию мужа. У меня в кыргызстане остался ребёнок от предыдущего брака, где в его свидетельстве написана моя девичья фамилия. И также на девичью фамилию есть генеральная доверенность на опеку и выезд из страны ребёнка от его родного отца.\n" +
                "\n" +
                "Как смена фамилии может повлиять на эти ситуации? Смогу ли я забрать ребёнка в сша поменяв свою фамилию и используя ген доверенность с девичьей фамилией для выезда ребёнка из страны?",
            category: citizenshipPassportRegistrationMigrationAndVisaIssues._id,
            datetime: "Thu Dec 24 2020 20:29:05 GMT+0600 (Kyrgyzstan Time)",
            user: user._id,
            published: true,
            region: TalasRegion._id,
            deleted: false,
            newId: "3h_Hooq0Cwm2A1Haef7f6",
            answers: 1
        },


        ///___________Question_7
        {
            title: "Ходатайство о съемке на видео судебного заседания ВС по гражданскoму дeлу",
            description: "Я хочу снять на видео мое судебное заседания по гражданскому делу.\n" +
                "\n" +
                "Кому надо передать ходатайство о видеосъёмке судебного заседания в Верховном суде? Судьям или канцелярие? До начала судебного заседания сколько должно оставаться,чтоб я смогла успеть передать ходатайство и получить ответ?",
            category: marriageAndFamily._id,
            datetime: "Thu Dec 24 2020 20:30:05 GMT+0600 (Kyrgyzstan Time)",
            user: user2._id,
            published: true,
            region: BatkenRegion._id,
            deleted: false,
            newId: "4h_Hooq0Cwm2A1Haef7f7",
            answers: 1,
        },


        ///___________Question_8
        {
            title: "Ограничение на выезд должника по алиментам",
            description: "Здравствуйте,\n" +
                "\n" +
                "Хотела у вас уточнить. Должник по алиментам выехал за границу, сменив ФИО, можно ли его найти, какие меры можно применить? Есть ли какие-нибудь меры воздействия?\n" +
                "\n" +
                "И еще вопрос, по запросу адвоката или судисполнителя, ГРС может сказать новые ФИО, если должник сменил?\n" +
                "\n" +
                "Спасибо большое за помощь.",
            category: marriageAndFamily._id,
            datetime: "Thu Dec 24 2020 20:31:05 GMT+0600 (Kyrgyzstan Time)",
            user: user._id,
            published: true,
            region: ChuiRegion._id,
            deleted: false,
            newId: "5h_Hooq0Cwm2A1Haef7f8",
            answers: 1,
        },


        ///___________Question_9
        {
            title: "Я писала заявление на алименты и на ограничение на выезд, но не смотря на все это бывший супруг уехал в Россию",
            description: "Я писала заявление на алименты и на ограничение на выезд, но не смотря на все это бывший супруг уехал в Россию.\n" +
                "\n" +
                "По словам его родственников он больше не приедет.\n" +
                "\n" +
                "Как я могу оформить сына на свою фамилию?",
            category: marriageAndFamily._id,
            datetime: "Thu Dec 24 2020 20:32:05 GMT+0600 (Kyrgyzstan Time)",
            user: user2._id,
            published: false,
            region: OshRegion._id,
            deleted: false,
            newId: "4h_Hooq0Cwm2A1Haef7f9",
            answers: 0
        },


        ///___________Question_10
        {
            title: "Буду ли я платить налог на полученную дарственную квартиру?",
            description: "Моя тётя хочет оформить дарственную на свою квартиру. Я работаю в школе, имею 1/4 долю родительского дома в собственности.\n" +
                "\n" +
                "Буду ли я платить налог на полученную дарственную квартиру?",
            category: inheritance._id,
            datetime: "Thu Dec 24 2020 20:33:05 GMT+0600 (Kyrgyzstan Time)",
            user: user._id,
            published: false,
            region: TalasRegion._id,
            deleted: false,
            newId: "5h_Hooq0Cwm2A1Haef7f0",
            answers: 0
        },


        ///___________Question_11
        {
            title: "Не правильный объем двигателя при оформлении авто",
            description: "Здравствуйте,\n" +
                "\n" +
                "подскажите пожалуйста, после смерти мужа осталась в наследство машина.После осмотра обнаружила, что объем машины указан не правильно, соответственно и название тоже. Вместо rx 300,в тех паспорте rx 330.\n" +
                "\n" +
                "Чья вина? И какие действия дальнейшие нужно предпринять, чтобы не было проблем при продаже?",
            category: trafficAccidentsRegistrationAndArrestOfACar._id,
            datetime: "Thu Dec 24 2020 20:34:05 GMT+0600 (Kyrgyzstan Time)",
            user: user2._id,
            published: false,
            region: BatkenRegion._id,
            deleted: false,
            newId: "5h_Hooq0Cwm2A1Haef711",
            answers: 0
        },


        ///___________Question_12
        {
            title: "Про ежегодный отпуск после отпуска по беременности и родам",
            description: "Здравствуйте,\n" +
                "\n" +
                "я вышла в отпуск по беременности и родам в 2020 году в августе , потом срок истёк и я написала заявление о отпуске по уходу за ребёнком , и сейчас в хочу получить ежегодный оплачиваемый отпуск, но почему то начальник говорит ,что это незаконно?",
            category: laborDisputes._id,
            datetime: "Thu Dec 24 2020 20:35:05 GMT+0600 (Kyrgyzstan Time)",
            user: user._id,
            published: true,
            region: ChuiRegion._id,
            deleted: false,
            newId: "5h_Hooq0Cwm2A1Haef712",
            answers: 1
        },


        ///___________Question_13
        {
            title: "Подача документов на наследство в КР иностранному гражданину",
            description: "Добрый день!\n" +
                "\n" +
                "Скажите, нужно ли иностранному гражданину переводить свой паспорт на кыргызский или русский язык для подачи заявки на право наследования?\n" +
                "\n" +
                "И где восстановить подтверждение приватизации квартиры?\n" +
                "\n" +
                "Из техпаспорта известна точная дата приватизации, но документ о приватизации не найден.\n" +
                "\n" +
                "Спасибо.",
            category: inheritance._id,
            datetime: "Thu Dec 24 2020 20:36:05 GMT+0600 (Kyrgyzstan Time)",
            user: user2._id,
            published: false,
            region: OshRegion._id,
            deleted: false,
            newId: "5h_Hooq0Cwm2A1Haef713",
            answers: 0
        },


        ///___________Question_14
        {
            title: "Открыть телевидение или радио",
            description: "Вопрос: Открыть телевидение или радио. Где брать разрешение? Лицензию?\n" +
                "\n" +
                "Телевидение не для всей республики, а для маленького района. Где-то максимум 50 000 человек.",
            category: registrationOfCommercialAndNonCommercialOrganizationsObtainingLicensesAndPermits._id,
            datetime: "Thu Dec 24 2020 20:37:05 GMT+0600 (Kyrgyzstan Time)",
            user: user._id,
            published: false,
            region: TalasRegion._id,
            deleted: false,
            newId: "5h_Hooq0Cwm2A1Haef714",
            answers: 0
        },


        ///___________Question_15
        {
            title: "Работодатель и ИТД на основе патента",
            description: "У меня такой вопрос:\n" +
                "\n" +
                "ОсОО занимается строительством, в штате 3 единиц (директор, бух, прораб)\n" +
                "Работы в строительстве ведутся в Индивидуальными Трудовыми Деятельностями т.е. привлекаются люди которые работаю по патенту.\n" +
                "и эти люди по патенту делают нам услуги и мы им оплачиваем сумму в договоре.\n" +
                "\n" +
                "Вопрос:\n" +
                "Работодатель т.е. ОсОО имеет начислять страховые взносы 17,25% для работника (ИТД патентщика) которые предоствавляет услуги или работы ?",
            category: doingBusinessChecksAndTaxes._id,
            datetime: "Thu Dec 24 2020 20:38:05 GMT+0600 (Kyrgyzstan Time)",
            user: user2._id,
            published: false,
            region: BatkenRegion._id,
            deleted: false,
            newId: "5h_Hooq0Cwm2A1Haef715",
            answers: 0
        });

    await Answer.create(
        //___________Question_1
        {
            answer: "Здравствуйте, в соответствии со ст.30 Уголовным кодеком КР от 2 февраля 2017 года № 19 Уголовной ответственности подлежит лицо, которому до совершения преступления исполнилось шестнадцать лет. ",
            question: realQuestion1._id,
            user: moderator._id,
        },
        //___________Question_1


        //___________Question_2
        {
            answer: "Здравствуйте, согласно ст.62 Семейного кодекса КР Ребенок имеет право на свободное выражение собственного мнения. Осуществление права ребенка выражать свое мнение может подвергаться ограничениям только в случаях, предусмотренных законами, в целях уважения прав и репутации других лиц, а также охраны государственной безопасности, общественного порядка, здоровья и нравственности населения Кыргызской Республики. В случаях, предусмотренных настоящим Кодексом (статьи 64 и 77) и Кодексом Кыргызской Республики о детях (статьи 42, 52, 56, 63, 64, 65 и 79), территориальное подразделение уполномоченного государственного органа по защите детей или суд могут принять решение только с согласия ребенка, достигшего возраста десяти лет.",
            question: realQuestion2._id,
            user: moderator._id,
        },
        //___________Question_2

        //___________Question_3
        {
            answer: "Здравствуйте, совершенно верно. Только через суд. ",
            question: realQuestion3._id,
            user: moderator._id,
        },
        //___________Question_3


        //___________Question_4
        {
            answer: "Доброго дня, оформление очень сложное будет поскольку вы пропустили 6 месячный срок принятия наследства от дедушки по наследств которого вы вступаете в наследование по праву представления, который нужно восстанавливать через суд. По нотариальной доверенности окажу вам полатные адвокатские услуги по решению вопроса пишите на почту. Удачи и здоровья Вам.",
            question: realQuestion4._id,
            user: moderator._id,
        },
        //___________Question_4


        //___________Question_5
        {
            answer: "Здравствуйте, \n" +
                "\n" +
                "Нет, нельзя. Для отчуждения земельного участка вам необходимо представить правоустановливающие документы на земельный участок. Передача прав собственности производится в ГУ \" Кадастр\". ",
            question: realQuestion5._id,
            user: moderator._id,
        },
        //___________Question_5


        //___________Question_6
        {
            answer: "Здравствуйте,\n" +
                "\n" +
                "вы можете поменять свидетельство о рождении ребенка в связи со сменой вашей фамилии по доверенности или забрать своего ребенка доказывая родство при получении визы для ребенка в США через свидетельство о рождении ребенка, свидетельство о браке, паспорт все это необходимо предоставлять с заверенным переводом при пересечении госграницы Кыргызской Республики. ",
            question: realQuestion6._id,
            user: moderator._id,
        },
        //___________Question_6

        //___________Question_7
        {
            answer: "Доброго дня, ходатайство подаете на имя председательствующего судьи заблаговременно. через канцелярию суда (желательно за 7-10 дней до процесса). Ответ вы получите только на судебном заседании, поскольку разрешение видеосъемки суд разрешит на самом процессе с учетом мнения всех участвующих лиц. Удачи и здоровья Вам.",
            question: realQuestion7._id,
            user: moderator._id,
        },
        //___________Question_7

        //___________Question_8
        {
            answer: "Здравствуйте, \n" +
                "\n" +
                "По адвокатским запросам не дают. Обратитесь в ПССИ соответствующим заявлением о истребовании заверенной копии свидетельства о перемене ФИО. ",
            question: realQuestion8._id,
            user: moderator._id,
        },
        //___________Question_8


        //___________Question_12
        {
            answer: "Доброго дня, согласно Трудовому кодексу вы получаете оплачиваемый ежегодный отпуск только по фактически отработанному времени или по согласованию с Работодателем авансом (в долг), то есть ваш начальник прав. Удачи и здоровья Вам.",
            question: realQuestion12._id,
            user: moderator._id,
        },
        //___________Question_12
    )
    db.close();
});
