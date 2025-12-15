import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface Car {
  id: number;
  name: string;
  brand: string;
  price: number;
  year: number;
  mileage: number;
  fuel: string;
  transmission: string;
  image: string;
  inStock: boolean;
}

const mockCars: Car[] = [
  {
    id: 1,
    name: 'Mercedes-Benz S-Class',
    brand: 'Mercedes-Benz',
    price: 8500000,
    year: 2023,
    mileage: 5000,
    fuel: 'Бензин',
    transmission: 'Автомат',
    image: 'https://cdn.poehali.dev/projects/10ef4b30-77ef-4b06-812e-9ef48b1af0b6/files/34d304b6-698f-4224-84ae-45b32a33b96c.jpg',
    inStock: true
  },
  {
    id: 2,
    name: 'Audi RS6 Avant',
    brand: 'Audi',
    price: 7200000,
    year: 2024,
    mileage: 1200,
    fuel: 'Бензин',
    transmission: 'Автомат',
    image: 'https://cdn.poehali.dev/projects/10ef4b30-77ef-4b06-812e-9ef48b1af0b6/files/bcdc45e0-4abc-48d5-a84a-b1fb68f876e7.jpg',
    inStock: true
  },
  {
    id: 3,
    name: 'BMW X7 M50i',
    brand: 'BMW',
    price: 9800000,
    year: 2023,
    mileage: 8500,
    fuel: 'Бензин',
    transmission: 'Автомат',
    image: 'https://cdn.poehali.dev/projects/10ef4b30-77ef-4b06-812e-9ef48b1af0b6/files/e67bcf18-e40a-418f-9b7e-9b9f70d28ddf.jpg',
    inStock: true
  }
];

const Index = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState('catalog');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 15000000]);
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [loanTerm, setLoanTerm] = useState(60);
  const [interestRate, setInterestRate] = useState(12);

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const filteredCars = mockCars.filter(car => {
    const brandMatch = selectedBrand === 'all' || car.brand === selectedBrand;
    const priceMatch = car.price >= priceRange[0] && car.price <= priceRange[1];
    return brandMatch && priceMatch;
  });

  const favoriteCars = mockCars.filter(car => favorites.includes(car.id));

  const calculateMonthlyPayment = () => {
    const monthlyRate = interestRate / 100 / 12;
    const payment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / (Math.pow(1 + monthlyRate, loanTerm) - 1);
    return payment;
  };

  const CarCard = ({ car }: { car: Car }) => (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in">
      <div className="relative">
        <img src={car.image} alt={car.name} className="w-full h-64 object-cover" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 bg-white/90 hover:bg-white"
          onClick={() => toggleFavorite(car.id)}
        >
          <Icon
            name={favorites.includes(car.id) ? 'Heart' : 'Heart'}
            className={favorites.includes(car.id) ? 'fill-accent text-accent' : ''}
            size={20}
          />
        </Button>
        {car.inStock && (
          <Badge className="absolute top-4 left-4 bg-accent">В наличии</Badge>
        )}
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold mb-1">{car.name}</h3>
            <p className="text-muted-foreground text-sm">{car.year} • {car.mileage.toLocaleString()} км</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-accent">{(car.price / 1000000).toFixed(1)} млн ₽</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Fuel" size={16} />
            <span>{car.fuel}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Settings" size={16} />
            <span>{car.transmission}</span>
          </div>
        </div>
        <Button className="w-full" size="lg">
          <Icon name="Phone" size={18} className="mr-2" />
          Связаться с менеджером
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Car" size={32} />
              <div>
                <h1 className="text-3xl font-bold">АвтоМир</h1>
                <p className="text-sm opacity-90">Премиум автомобили в наличии</p>
              </div>
            </div>
            <nav className="hidden md:flex gap-6">
              <button
                onClick={() => setActiveTab('catalog')}
                className={`hover:text-accent transition-colors ${activeTab === 'catalog' ? 'text-accent font-semibold' : ''}`}
              >
                Каталог
              </button>
              <button
                onClick={() => setActiveTab('favorites')}
                className={`hover:text-accent transition-colors ${activeTab === 'favorites' ? 'text-accent font-semibold' : ''}`}
              >
                Избранное ({favorites.length})
              </button>
              <button
                onClick={() => setActiveTab('calculator')}
                className={`hover:text-accent transition-colors ${activeTab === 'calculator' ? 'text-accent font-semibold' : ''}`}
              >
                Калькулятор кредита
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className={`hover:text-accent transition-colors ${activeTab === 'about' ? 'text-accent font-semibold' : ''}`}
              >
                О компании
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`hover:text-accent transition-colors ${activeTab === 'reviews' ? 'text-accent font-semibold' : ''}`}
              >
                Отзывы
              </button>
              <button
                onClick={() => setActiveTab('contacts')}
                className={`hover:text-accent transition-colors ${activeTab === 'contacts' ? 'text-accent font-semibold' : ''}`}
              >
                Контакты
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="hidden" />
          <TabsContent value="catalog" className="mt-0">
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-2">Каталог автомобилей</h2>
              <p className="text-muted-foreground">Выберите автомобиль своей мечты</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <Card className="p-6">
                <Label className="mb-2 block font-semibold">Бренд</Label>
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все бренды</SelectItem>
                    <SelectItem value="Mercedes-Benz">Mercedes-Benz</SelectItem>
                    <SelectItem value="BMW">BMW</SelectItem>
                    <SelectItem value="Audi">Audi</SelectItem>
                  </SelectContent>
                </Select>
              </Card>

              <Card className="p-6 md:col-span-3">
                <Label className="mb-4 block font-semibold">
                  Цена: {(priceRange[0] / 1000000).toFixed(1)} - {(priceRange[1] / 1000000).toFixed(1)} млн ₽
                </Label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={15000000}
                  min={0}
                  step={100000}
                  className="mb-2"
                />
              </Card>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map(car => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>

            {filteredCars.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Search" size={64} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-2xl font-bold mb-2">Автомобили не найдены</h3>
                <p className="text-muted-foreground">Попробуйте изменить фильтры поиска</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="favorites">
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-2">Избранное</h2>
              <p className="text-muted-foreground">Ваши любимые автомобили</p>
            </div>

            {favoriteCars.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteCars.map(car => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Icon name="Heart" size={64} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-2xl font-bold mb-2">Избранное пусто</h3>
                <p className="text-muted-foreground mb-4">Добавьте автомобили в избранное, чтобы видеть их здесь</p>
                <Button onClick={() => setActiveTab('catalog')}>
                  Перейти в каталог
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="calculator">
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-2">Калькулятор кредита</h2>
              <p className="text-muted-foreground">Рассчитайте ежемесячный платеж</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8">
                <div className="space-y-6">
                  <div>
                    <Label className="mb-4 block font-semibold">
                      Стоимость автомобиля: {(loanAmount / 1000000).toFixed(2)} млн ₽
                    </Label>
                    <Slider
                      value={[loanAmount]}
                      onValueChange={(val) => setLoanAmount(val[0])}
                      max={15000000}
                      min={500000}
                      step={100000}
                    />
                  </div>

                  <div>
                    <Label className="mb-4 block font-semibold">
                      Срок кредита: {loanTerm} месяцев ({(loanTerm / 12).toFixed(1)} года)
                    </Label>
                    <Slider
                      value={[loanTerm]}
                      onValueChange={(val) => setLoanTerm(val[0])}
                      max={84}
                      min={12}
                      step={12}
                    />
                  </div>

                  <div>
                    <Label className="mb-4 block font-semibold">
                      Процентная ставка: {interestRate}%
                    </Label>
                    <Slider
                      value={[interestRate]}
                      onValueChange={(val) => setInterestRate(val[0])}
                      max={25}
                      min={5}
                      step={0.5}
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg opacity-90 mb-2">Ежемесячный платеж</h3>
                    <p className="text-5xl font-bold">{calculateMonthlyPayment().toLocaleString('ru-RU', { maximumFractionDigits: 0 })} ₽</p>
                  </div>

                  <div className="h-px bg-primary-foreground/20"></div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="opacity-90">Стоимость</span>
                      <span className="font-semibold">{(loanAmount / 1000000).toFixed(2)} млн ₽</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-90">Срок</span>
                      <span className="font-semibold">{loanTerm} мес.</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-90">Ставка</span>
                      <span className="font-semibold">{interestRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-90">Переплата</span>
                      <span className="font-semibold">{((calculateMonthlyPayment() * loanTerm - loanAmount) / 1000000).toFixed(2)} млн ₽</span>
                    </div>
                  </div>

                  <Button variant="secondary" size="lg" className="w-full">
                    <Icon name="MessageSquare" size={18} className="mr-2" />
                    Оформить заявку
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="about">
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-2">О компании АвтоМир</h2>
              <p className="text-muted-foreground">Ваш надежный партнер в мире автомобилей</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8">
                <Icon name="Award" size={48} className="text-accent mb-4" />
                <h3 className="text-2xl font-bold mb-4">15 лет на рынке</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Компания АвтоМир работает с 2009 года и за это время стала одним из крупнейших 
                  дилеров премиум автомобилей в России. Мы предлагаем широкий выбор автомобилей 
                  ведущих мировых брендов.
                </p>
              </Card>

              <Card className="p-8">
                <Icon name="Users" size={48} className="text-accent mb-4" />
                <h3 className="text-2xl font-bold mb-4">Более 10 000 клиентов</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Нашими клиентами стали тысячи автолюбителей по всей стране. Мы гордимся 
                  доверием наших покупателей и стремимся предоставлять только лучший сервис 
                  и качественные автомобили.
                </p>
              </Card>

              <Card className="p-8">
                <Icon name="Shield" size={48} className="text-accent mb-4" />
                <h3 className="text-2xl font-bold mb-4">Гарантия качества</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Все автомобили проходят тщательную проверку и техническое обслуживание перед 
                  продажей. Мы предоставляем расширенную гарантию и полное сопровождение после 
                  покупки.
                </p>
              </Card>

              <Card className="p-8">
                <Icon name="Headphones" size={48} className="text-accent mb-4" />
                <h3 className="text-2xl font-bold mb-4">Поддержка 24/7</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Наши специалисты всегда готовы помочь вам с выбором автомобиля, оформлением 
                  документов и решением любых вопросов. Мы работаем для вашего комфорта.
                </p>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-2">Отзывы клиентов</h2>
              <p className="text-muted-foreground">Что говорят о нас наши покупатели</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  name: 'Алексей Иванов',
                  car: 'Mercedes-Benz S-Class',
                  rating: 5,
                  text: 'Отличный сервис! Помогли выбрать автомобиль, оформили все документы быстро. Машина в идеальном состоянии, полностью доволен покупкой.'
                },
                {
                  name: 'Мария Петрова',
                  car: 'BMW X7',
                  rating: 5,
                  text: 'Спасибо команде АвтоМир за профессионализм! Купила BMW X7 и очень довольна. Менеджеры компетентные, помогли с кредитом.'
                },
                {
                  name: 'Дмитрий Сидоров',
                  car: 'Audi RS6',
                  rating: 5,
                  text: 'Лучший автосалон в городе! Большой выбор, адекватные цены, честный подход. Рекомендую всем, кто ищет качественный автомобиль.'
                },
                {
                  name: 'Елена Волкова',
                  car: 'Mercedes-Benz GLE',
                  rating: 5,
                  text: 'Покупала автомобиль впервые, очень переживала. Но сотрудники все подробно объяснили, помогли с выбором. Машина супер!'
                }
              ].map((review, index) => (
                <Card key={index} className="p-6 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                      {review.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold">{review.name}</h4>
                      <p className="text-sm text-muted-foreground">{review.car}</p>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="fill-accent text-accent" />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{review.text}</p>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contacts">
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-2">Контакты</h2>
              <p className="text-muted-foreground">Свяжитесь с нами удобным способом</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-6">Наши контакты</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Icon name="MapPin" size={24} className="text-accent mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Адрес</p>
                      <p className="text-muted-foreground">Москва, Ленинградский проспект, д. 39, стр. 1</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Icon name="Phone" size={24} className="text-accent mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Телефон</p>
                      <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Icon name="Mail" size={24} className="text-accent mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Email</p>
                      <p className="text-muted-foreground">info@automir.ru</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Icon name="Clock" size={24} className="text-accent mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Режим работы</p>
                      <p className="text-muted-foreground">Пн-Вс: 09:00 - 21:00</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-6">Напишите нам</h3>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="name">Ваше имя</Label>
                    <Input id="name" placeholder="Иван Иванов" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Телефон</Label>
                    <Input id="phone" placeholder="+7 (___) ___-__-__" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="message">Сообщение</Label>
                    <Input id="message" placeholder="Интересует BMW X7..." className="mt-2" />
                  </div>
                  <Button className="w-full" size="lg">
                    <Icon name="Send" size={18} className="mr-2" />
                    Отправить сообщение
                  </Button>
                </form>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-primary text-primary-foreground mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Car" size={24} />
                <h3 className="text-xl font-bold">АвтоМир</h3>
              </div>
              <p className="text-sm opacity-80">Премиум автомобили в наличии с 2009 года</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Каталог</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>Mercedes-Benz</li>
                <li>BMW</li>
                <li>Audi</li>
                <li>Porsche</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>О нас</li>
                <li>Отзывы</li>
                <li>Контакты</li>
                <li>Вакансии</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>Кредит</li>
                <li>Trade-in</li>
                <li>Страхование</li>
                <li>Сервис</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-80">
            <p>© 2024 АвтоМир. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;