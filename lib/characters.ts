import type { Locale } from "./i18n";

export type CharacterCategory =
  | "romanceable"
  | "non-romanceable"
  | "market-vendor"
  | "special";

type LocalizedText = Record<Locale, string>;

export type CharacterRecord = {
  slug: string;
  locale: Locale;
  name: string;
  role: string;
  category: CharacterCategory;
  portrait?: string;
  birthday: string;
  occupation: string;
  residence: string;
  relationshipStatus: string;
  genderOrType: string;
  relationships: string;
  summary: string;
};

type CharacterSource = {
  slug: string;
  category: CharacterCategory;
  name: LocalizedText;
  genderOrType: LocalizedText;
  role: LocalizedText;
  location: LocalizedText;
  relationships: LocalizedText;
  summary: LocalizedText;
  relationshipStatus: LocalizedText;
  portrait?: string;
  birthday?: LocalizedText;
};

const text = (en: string, zh: string): LocalizedText => ({ en, zh });

const romanceStatus = text(
  "Romance and marriage candidate",
  "常规恋爱与结婚候选人",
);
const notRomanceable = text("Not romanceable", "不可恋爱");
const visitingVendor = text("Visiting character; not romanceable", "来访角色；不可恋爱");

const roster: CharacterSource[] = [
  {
    slug: "adeline",
    category: "romanceable",
    name: text("Adeline", "阿德琳"),
    genderOrType: text("Female", "女性"),
    role: text(
      "Town administrator and restoration leader",
      "小镇行政负责人兼重建工作领导者",
    ),
    location: text("Manor House; around town and the request board", "庄园宅邸、小镇各处与委托板附近"),
    relationships: text("Eiland’s sister; member of Mistria’s ruling family", "艾兰德的姐姐；米斯特里亚统治家族成员"),
    summary: text(
      "Organized, responsible, ambitious, hardworking, and deeply committed to rebuilding Mistria.",
      "做事有条理、负责、有抱负且勤奋，全心投入米斯特里亚的重建。",
    ),
    relationshipStatus: romanceStatus,
    portrait: "/images/characters/adeline.webp",
    birthday: text("Winter 18", "冬季 18 日"),
  },
  {
    slug: "balor",
    category: "romanceable",
    name: text("Balor", "巴洛尔"),
    genderOrType: text("Male", "男性"),
    role: text("Traveling merchant and shipping specialist", "旅行商人兼货运协助者"),
    location: text("Balor’s Wagon; around Mistria", "巴洛尔货车；米斯特里亚各处"),
    relationships: text("Regularly conducts business with local residents", "经常与当地居民开展生意往来"),
    summary: text(
      "Clever, confident, mysterious, and interested in valuable goods and gemstones.",
      "聪明、自信且神秘，热衷贵重商品与宝石。",
    ),
    relationshipStatus: romanceStatus,
    portrait: "/images/characters/balor.webp",
    birthday: text("Summer 7", "夏季 7 日"),
  },
  {
    slug: "celine",
    category: "romanceable",
    name: text("Celine", "瑟琳"),
    genderOrType: text("Female", "女性"),
    role: text("Gardener and plant enthusiast", "园艺师与植物爱好者"),
    location: text("Her family home; gardens and outdoor areas", "家中、花园与户外区域"),
    relationships: text("Daughter of Holt and Nora; sister of Luc and Maple", "霍尔特与诺拉的女儿；卢克和梅普尔的姐姐"),
    summary: text("Gentle, friendly, thoughtful, and passionate about flowers, plants, and nature.", "温柔、友善且体贴，热爱花卉、植物与自然。"),
    relationshipStatus: romanceStatus,
  },
  {
    slug: "eiland",
    category: "romanceable",
    name: text("Eiland", "艾兰德"),
    genderOrType: text("Male", "男性"),
    role: text("Archaeologist, historian, and ruling-family member", "考古学家、历史学者与统治家族成员"),
    location: text("Manor House; Museum and archaeological sites", "庄园宅邸、博物馆与考古地点"),
    relationships: text("Adeline’s brother", "阿德琳的弟弟"),
    summary: text("Friendly, enthusiastic, curious, academic, and fond of archaeology, history, and desserts.", "友善、热情、好奇且富有学术精神，尤其喜欢考古、历史与甜点。"),
    relationshipStatus: romanceStatus,
    portrait: "/images/characters/eiland.webp",
    birthday: text("Spring 15", "春季 15 日"),
  },
  {
    slug: "hayden",
    category: "romanceable",
    name: text("Hayden", "海登"),
    genderOrType: text("Male", "男性"),
    role: text("Farmer and animal caretaker", "农场主与动物照料者"),
    location: text("Sweetwater Farm", "甜水农场"),
    relationships: text("Owner and caretaker of Henrietta and other farm animals", "亨丽埃塔及其他农场动物的主人与照料者"),
    summary: text("Warm, relaxed, sociable, hardworking, and deeply fond of animals.", "温暖、随和、善于交际且勤劳，非常喜爱动物。"),
    relationshipStatus: romanceStatus,
  },
  {
    slug: "juniper",
    category: "romanceable",
    name: text("Juniper", "朱尼珀"),
    genderOrType: text("Female", "女性"),
    role: text("Bathhouse owner; magic and alchemy practitioner", "浴场老板；魔法与炼金术实践者"),
    location: text("The Bathhouse", "浴场"),
    relationships: text("Dozy is her dog and close companion", "多兹是她的狗和亲密伙伴"),
    summary: text("Intelligent, theatrical, confident, competitive, and fascinated by magic and potions.", "聪明、戏剧化、自信且好胜，对魔法、药剂与异常现象充满兴趣。"),
    relationshipStatus: romanceStatus,
  },
  {
    slug: "march",
    category: "romanceable",
    name: text("March", "马奇"),
    genderOrType: text("Male", "男性"),
    role: text("Blacksmith", "铁匠"),
    location: text("Blacksmith’s Shop", "铁匠铺"),
    relationships: text("Olric’s younger brother", "奥尔里克的弟弟"),
    summary: text("Blunt, guarded, competitive, hardworking, and passionate about metalworking and quality ore.", "直率、戒备心强、好胜且勤奋，热爱金属加工与高品质矿石。"),
    relationshipStatus: romanceStatus,
  },
  {
    slug: "reina",
    category: "romanceable",
    name: text("Reina", "蕾娜"),
    genderOrType: text("Female", "女性"),
    role: text("Cook at the Sleeping Dragon Inn", "沉睡巨龙旅店厨师"),
    location: text("Sleeping Dragon Inn", "沉睡巨龙旅店"),
    relationships: text("Daughter of Hemlock and Josephine; Dell’s older sister", "海姆洛克与约瑟芬的女儿；戴尔的姐姐"),
    summary: text("Kind, creative, welcoming, and passionate about cooking, recipes, and new flavors.", "善良、有创造力且热情好客，热爱烹饪、食谱与新口味。"),
    relationshipStatus: romanceStatus,
  },
  {
    slug: "ryis",
    category: "romanceable",
    name: text("Ryis", "莱斯"),
    genderOrType: text("Male", "男性"),
    role: text("Carpenter and woodworker", "木匠与木工"),
    location: text("Carpenter’s Shop", "木匠铺"),
    relationships: text("Landen’s relative and work partner", "兰登的亲属与工作伙伴"),
    summary: text("Calm, dependable, artistic, considerate, and interested in woodworking, construction, and birds.", "沉稳、可靠、有艺术气质且体贴，喜欢木工、建造与鸟类。"),
    relationshipStatus: romanceStatus,
  },
  {
    slug: "valen",
    category: "romanceable",
    name: text("Valen", "瓦伦"),
    genderOrType: text("Female", "女性"),
    role: text("Doctor and medical researcher", "医生与医学研究者"),
    location: text("Clinic", "诊所"),
    relationships: text("Serves Mistria’s residents as their physician", "作为医生照料米斯特里亚居民"),
    summary: text("Composed, analytical, caring, practical, and dedicated to medicine and research.", "沉着、善于分析、关怀他人且务实，专注医学与科学研究。"),
    relationshipStatus: romanceStatus,
  },
  {
    slug: "dell",
    category: "non-romanceable",
    name: text("Dell", "戴尔"),
    genderOrType: text("Child", "儿童"),
    role: text("Young resident of Mistria", "米斯特里亚年幼居民"),
    location: text("Sleeping Dragon Inn; around town", "沉睡巨龙旅店与小镇各处"),
    relationships: text("Daughter of Hemlock and Josephine; Reina’s younger sister", "海姆洛克与约瑟芬的女儿；蕾娜的妹妹"),
    summary: text("Energetic, adventurous, mischievous, and often plays with Luc and Maple.", "精力充沛、爱冒险又调皮，经常与卢克和梅普尔一起玩耍。"),
    relationshipStatus: notRomanceable,
  },
  {
    slug: "dozy",
    category: "non-romanceable",
    name: text("Dozy", "多兹"),
    genderOrType: text("Animal", "动物"),
    role: text("Juniper’s dog and bathhouse companion", "朱尼珀的狗与浴场伙伴"),
    location: text("The Bathhouse", "浴场"),
    relationships: text("Juniper’s pet and companion", "朱尼珀的宠物与伙伴"),
    summary: text("A large, sleepy dog often resting inside or near the bathhouse.", "一只体型很大、爱睡觉的狗，常在浴场内外休息。"),
    relationshipStatus: notRomanceable,
  },
  {
    slug: "elsie",
    category: "non-romanceable",
    name: text("Elsie", "艾尔西"),
    genderOrType: text("Adult resident", "成年居民"),
    role: text("Senior community and ruling-family member", "社区长者与统治家族成员"),
    location: text("Manor House; around town", "庄园宅邸与小镇各处"),
    relationships: text("Older relative of Adeline and Eiland", "阿德琳与艾兰德的年长亲属"),
    summary: text("Sociable, perceptive, romantic, and knowledgeable about relationships and local history.", "善于交际、敏锐而浪漫，熟悉人际关系与本地历史。"),
    relationshipStatus: notRomanceable,
  },
  {
    slug: "errol",
    category: "non-romanceable",
    name: text("Errol", "埃罗尔"),
    genderOrType: text("Adult resident", "成年居民"),
    role: text("Scholar, historian, and museum researcher", "学者、历史学家与博物馆研究者"),
    location: text("Museum; his home", "博物馆与家中"),
    relationships: text("Connected to Mistria’s academic and archaeological work", "参与米斯特里亚的学术与考古活动"),
    summary: text("Highly knowledgeable about history, artifacts, the mines, and Mistria’s past.", "对历史、古物、矿洞与米斯特里亚的过去了解甚深。"),
    relationshipStatus: notRomanceable,
  },
  {
    slug: "hemlock",
    category: "non-romanceable",
    name: text("Hemlock", "海姆洛克"),
    genderOrType: text("Adult resident", "成年居民"),
    role: text("Sleeping Dragon Inn co-owner", "沉睡巨龙旅店共同经营者"),
    location: text("Sleeping Dragon Inn", "沉睡巨龙旅店"),
    relationships: text("Josephine’s husband; father of Reina and Dell", "约瑟芬的丈夫；蕾娜与戴尔的父亲"),
    summary: text("Friendly and welcoming; helps run the inn and serve the community.", "友善热情，协助经营旅店并服务社区。"),
    relationshipStatus: notRomanceable,
  },
  {
    slug: "holt",
    category: "non-romanceable",
    name: text("Holt", "霍尔特"),
    genderOrType: text("Adult resident", "成年居民"),
    role: text("General Store owner", "杂货店老板"),
    location: text("General Store", "杂货店"),
    relationships: text("Nora’s husband; father of Celine, Luc, and Maple", "诺拉的丈夫；瑟琳、卢克与梅普尔的父亲"),
    summary: text("Practical, family-oriented, and responsible for supplying everyday goods.", "务实且重视家庭，为小镇供应日常商品。"),
    relationshipStatus: notRomanceable,
  },
  {
    slug: "henrietta",
    category: "non-romanceable",
    name: text("Henrietta", "亨丽埃塔"),
    genderOrType: text("Animal", "动物"),
    role: text("Hayden’s prized chicken", "海登珍爱的鸡"),
    location: text("Sweetwater Farm", "甜水农场"),
    relationships: text("Cared for by Hayden", "由海登照料"),
    summary: text("A prominent animal character with an unusually important place in Hayden’s life.", "一位格外醒目的动物角色，在海登生活中占有不同寻常的重要位置。"),
    relationshipStatus: notRomanceable,
  },
  {
    slug: "josephine",
    category: "non-romanceable",
    name: text("Josephine", "约瑟芬"),
    genderOrType: text("Adult resident", "成年居民"),
    role: text("Sleeping Dragon Inn co-owner and cook", "沉睡巨龙旅店共同经营者兼厨师"),
    location: text("Sleeping Dragon Inn", "沉睡巨龙旅店"),
    relationships: text("Hemlock’s wife; mother of Reina and Dell", "海姆洛克的妻子；蕾娜与戴尔的母亲"),
    summary: text("Warm, hospitable, community-minded, and closely associated with the inn’s food.", "温暖好客、关心社区，与旅店及其餐食密切相关。"),
    relationshipStatus: notRomanceable,
  },
  {
    slug: "landen",
    category: "non-romanceable",
    name: text("Landen", "兰登"),
    genderOrType: text("Adult resident", "成年居民"),
    role: text("Senior carpenter and builder", "资深木匠与建筑工"),
    location: text("Carpenter’s Shop", "木匠铺"),
    relationships: text("Ryis’s relative and work partner", "莱斯的亲属与工作伙伴"),
    summary: text("Experienced, dependable, and responsible for construction and building upgrades.", "经验丰富且可靠，负责建筑施工与升级。"),
    relationshipStatus: notRomanceable,
  },
  {
    slug: "luc",
    category: "non-romanceable",
    name: text("Luc", "卢克"),
    genderOrType: text("Child", "儿童"),
    role: text("Young resident and nature observer", "年幼居民与自然观察爱好者"),
    location: text("General Store home; around town", "杂货店住处与小镇各处"),
    relationships: text("Son of Holt and Nora; brother of Celine and Maple", "霍尔特与诺拉的儿子；瑟琳和梅普尔的兄弟"),
    summary: text("Curious, energetic, and especially interested in insects, wildlife, and exploration.", "好奇且精力充沛，尤其喜欢昆虫、野生动物与探索。"),
    relationshipStatus: notRomanceable,
  },
  {
    slug: "maple",
    category: "non-romanceable",
    name: text("Maple", "梅普尔"),
    genderOrType: text("Child", "儿童"),
    role: text("Young resident of Mistria", "米斯特里亚年幼居民"),
    location: text("General Store home; around town", "杂货店住处与小镇各处"),
    relationships: text("Daughter of Holt and Nora; sister of Celine and Luc", "霍尔特与诺拉的女儿；瑟琳和卢克的姐妹"),
    summary: text("Imaginative, playful, and frequently spends time with Luc and Dell.", "富有想象力、爱玩耍，经常与卢克和戴尔一起活动。"),
    relationshipStatus: notRomanceable,
  },
  {
    slug: "nora",
    category: "non-romanceable",
    name: text("Nora", "诺拉"),
    genderOrType: text("Adult resident", "成年居民"),
    role: text("General Store owner", "杂货店老板"),
    location: text("General Store", "杂货店"),
    relationships: text("Holt’s wife; mother of Celine, Luc, and Maple", "霍尔特的妻子；瑟琳、卢克与梅普尔的母亲"),
    summary: text("Friendly, practical, caring, and involved in managing the family business.", "友善、务实且体贴，参与经营家庭生意。"),
    relationshipStatus: notRomanceable,
  },
  {
    slug: "olric",
    category: "non-romanceable",
    name: text("Olric", "奥尔里克"),
    genderOrType: text("Adult resident", "成年居民"),
    role: text("Miner and blacksmith’s assistant", "矿工兼铁匠助手"),
    location: text("Blacksmith’s Shop; the mines", "铁匠铺与矿洞"),
    relationships: text("March’s older brother", "马奇的哥哥"),
    summary: text("Cheerful, strong, outgoing, supportive, and notably friendlier than his younger brother.", "开朗、强壮、外向且乐于支持他人，明显比弟弟更加友善。"),
    relationshipStatus: notRomanceable,
  },
  {
    slug: "terithia",
    category: "non-romanceable",
    name: text("Terithia", "特里西娅"),
    genderOrType: text("Adult resident", "成年居民"),
    role: text("Fisher and seafaring resident", "渔夫与航海居民"),
    location: text("Beach, docks, and fishing areas", "海滩、码头与垂钓区域"),
    relationships: text("Long-standing member of the local community", "本地社区的老成员"),
    summary: text("Bold, experienced, and associated with fishing, the sea, and tales of adventure.", "勇敢且经验丰富，与捕鱼、大海和冒险故事密切相关。"),
    relationshipStatus: notRomanceable,
  },
  {
    slug: "darcy",
    category: "market-vendor",
    name: text("Darcy", "达西"),
    genderOrType: text("Saturday visitor", "周六访客"),
    role: text("Traveling food and drink vendor", "旅行食品与饮料商贩"),
    location: text("Saturday Market", "周六市场"),
    relationships: text("Visits Mistria on Saturdays", "每周六造访米斯特里亚"),
    summary: text("Sells rotating prepared food, drinks, sweets, and cooking-related goods.", "出售轮换的熟食、饮料、甜点与烹饪相关商品。"),
    relationshipStatus: visitingVendor,
  },
  {
    slug: "louis",
    category: "market-vendor",
    name: text("Louis", "路易斯"),
    genderOrType: text("Saturday visitor", "周六访客"),
    role: text("Traveling specialty-goods vendor", "旅行特色商品商贩"),
    location: text("Saturday Market", "周六市场"),
    relationships: text("Visits Mistria on Saturdays", "每周六造访米斯特里亚"),
    summary: text("Offers rotating specialty goods and market merchandise.", "提供轮换的特色商品与市场货品。"),
    relationshipStatus: visitingVendor,
  },
  {
    slug: "merri",
    category: "market-vendor",
    name: text("Merri", "梅里"),
    genderOrType: text("Saturday visitor", "周六访客"),
    role: text("Furniture and décor vendor", "家具与装饰品商贩"),
    location: text("Saturday Market", "周六市场"),
    relationships: text("Visits Mistria on Saturdays", "每周六造访米斯特里亚"),
    summary: text("Sells furniture, decorative items, and home-related merchandise.", "出售家具、装饰品与家居相关商品。"),
    relationshipStatus: visitingVendor,
  },
  {
    slug: "vera",
    category: "market-vendor",
    name: text("Vera", "维拉"),
    genderOrType: text("Saturday visitor", "周六访客"),
    role: text("Traveling stylist and vendor", "旅行造型师与商贩"),
    location: text("Saturday Market", "周六市场"),
    relationships: text("Visits Mistria on Saturdays", "每周六造访米斯特里亚"),
    summary: text("Provides appearance customization, cosmetics, hairstyles, and fashion services.", "提供外观定制、化妆、发型与时尚相关服务。"),
    relationshipStatus: visitingVendor,
  },
  {
    slug: "taliferro",
    category: "market-vendor",
    name: text("Taliferro", "塔利费罗"),
    genderOrType: text("Saturday visitor", "周六访客"),
    role: text("Specialty vendor", "特色商品商贩"),
    location: text("Saturday Market", "周六市场"),
    relationships: text("Visits Mistria on Saturdays", "每周六造访米斯特里亚"),
    summary: text("Offers rotating specialty merchandise that expands with progression.", "提供会随游戏进度解锁或扩展的轮换特色商品。"),
    relationshipStatus: visitingVendor,
  },
  {
    slug: "wheedle",
    category: "market-vendor",
    name: text("Wheedle", "惠德尔"),
    genderOrType: text("Saturday visitor", "周六访客"),
    role: text("Rare-goods vendor", "稀有商品商贩"),
    location: text("Saturday Market", "周六市场"),
    relationships: text("Visits Mistria on Saturdays", "每周六造访米斯特里亚"),
    summary: text("Sells expensive, unusual, or difficult-to-obtain merchandise.", "出售昂贵、罕见或难以获得的商品。"),
    relationshipStatus: visitingVendor,
  },
  {
    slug: "stillwell",
    category: "market-vendor",
    name: text("Stillwell", "斯蒂尔韦尔"),
    genderOrType: text("Saturday visitor", "周六访客"),
    role: text("Later-game market vendor", "后期内容市场商贩"),
    location: text("Saturday Market", "周六市场"),
    relationships: text("Visits Mistria on Saturdays", "每周六造访米斯特里亚"),
    summary: text("Carries a rotating specialty inventory introduced in later game content.", "提供在后期游戏内容中加入的轮换特色库存。"),
    relationshipStatus: visitingVendor,
  },
  {
    slug: "zorel",
    category: "market-vendor",
    name: text("Zorel", "佐雷尔"),
    genderOrType: text("Saturday visitor", "周六访客"),
    role: text("Specialty market vendor", "特色市场商贩"),
    location: text("Saturday Market", "周六市场"),
    relationships: text("Visits Mistria on Saturdays", "每周六造访米斯特里亚"),
    summary: text("Offers rotating goods associated with later progression.", "提供与后期进度相关的轮换商品。"),
    relationshipStatus: visitingVendor,
  },
  {
    slug: "caldarus",
    category: "special",
    name: text("Caldarus", "卡尔达鲁斯"),
    genderOrType: text("Male", "男性"),
    role: text("Ancient dragon connected to the farm statue", "与玩家农场雕像相连的远古巨龙"),
    location: text("Dragon statue; revealed through magic and main quests", "巨龙雕像；通过魔法与主线任务逐步接触"),
    relationships: text("Connected to Seridia and ancient Mistria", "与塞里迪娅及远古米斯特里亚有关"),
    summary: text("Guides the player’s magical development and is central to Mistria’s ancient history.", "引导玩家发展魔法，并与米斯特里亚的远古历史密切相关。"),
    relationshipStatus: text("Story-linked romance candidate; requires substantial progression", "剧情关联的特殊恋爱候选人；需要推进大量剧情"),
    portrait: "/images/characters/caldarus.webp",
  },
  {
    slug: "seridia",
    category: "special",
    name: text("Priestess / Seridia", "女祭司／塞里迪娅"),
    genderOrType: text("Female", "女性"),
    role: text("Ancient priestess initially known only by her title", "起初仅以称号为人所知的远古女祭司"),
    location: text("Encountered through progression in the Mines", "随矿洞进度首次相遇"),
    relationships: text("Connected to ancient magic, the Mines, and Caldarus", "与远古魔法、矿洞和卡尔达鲁斯有关"),
    summary: text("Her identity and history are revealed later as part of Mistria’s deeper story.", "她的真实身份与经历会在米斯特里亚更深层的剧情中逐步揭晓。"),
    relationshipStatus: text("Story-linked romance candidate; later identified as Seridia", "剧情关联的特殊恋爱候选人；后期确认身份为塞里迪娅"),
  },
];

const locales: Locale[] = ["en", "zh"];

const characters: CharacterRecord[] = roster.flatMap((character) =>
  locales.map((locale) => ({
    slug: character.slug,
    locale,
    name: character.name[locale],
    role: character.role[locale],
    category: character.category,
    portrait: character.portrait,
    birthday: character.birthday?.[locale] ?? (locale === "zh" ? "未知" : "Unknown"),
    occupation: character.role[locale],
    residence: character.location[locale],
    relationshipStatus: character.relationshipStatus[locale],
    genderOrType: character.genderOrType[locale],
    relationships: character.relationships[locale],
    summary: character.summary[locale],
  })),
);

export function getCharacters(locale: Locale): CharacterRecord[] {
  return characters.filter((character) => character.locale === locale);
}

export function getCharacter(locale: Locale, slug: string): CharacterRecord | null {
  return characters.find(
    (character) => character.locale === locale && character.slug === slug,
  ) ?? null;
}
