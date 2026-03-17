const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...\n');

    // 1. Create Admin User
    console.log('👤 Creating admin user...');
    const adminPasswordHash = await bcrypt.hash('Admin@123', 12);

    const admin = await prisma.user.upsert({
        where: { email: 'admin@doctorplatform.com' },
        update: {},
        create: {
            email: 'admin@doctorplatform.com',
            passwordHash: adminPasswordHash,
            fullName: 'Platform Administrator',
            role: 'ADMIN',
            isVerified: true,
            isActive: true,
        },
    });
    console.log('✅ Admin user created:', admin.email);

    // 2. Create Categories
    console.log('\n📂 Creating categories...');
    const categories = [
        {
            name: 'Diabetes',
            slug: 'diabetes',
            description: 'Information and guidance for diabetes management and prevention',
            icon: '🩺',
        },
        {
            name: 'Heart Disease',
            slug: 'heart-disease',
            description: 'Cardiovascular health, prevention, and treatment information',
            icon: '❤️',
        },
        {
            name: 'Skin Care',
            slug: 'skin-care',
            description: 'Dermatology tips, skin conditions, and beauty health',
            icon: '✨',
        },
        {
            name: 'Women Health',
            slug: 'women-health',
            description: 'Women\'s health, pregnancy, and reproductive wellness',
            icon: '🌸',
        },
        {
            name: 'Children Health',
            slug: 'children-health',
            description: 'Pediatric care, child development, and parenting health tips',
            icon: '👶',
        },
        {
            name: 'Mental Health',
            slug: 'mental-health',
            description: 'Mental wellness, stress management, and psychological support',
            icon: '🧠',
        },
        {
            name: 'Digestive Health',
            slug: 'digestive-health',
            description: 'Gastrointestinal health, nutrition, and digestive wellness',
            icon: '🥗',
        },
        {
            name: 'General Health',
            slug: 'general-health',
            description: 'Overall wellness, preventive care, and healthy living',
            icon: '🏥',
        },
    ];

    const createdCategories = [];
    for (const category of categories) {
        const created = await prisma.category.upsert({
            where: { slug: category.slug },
            update: {},
            create: {
                ...category,
                createdById: admin.id,
            },
        });
        createdCategories.push(created);
        console.log(`✅ Category created: ${created.name}`);
    }

    // 3. Create Sample Doctors
    console.log('\n👨‍⚕️ Creating sample doctors...');
    const doctors = [
        {
            email: 'dr.sarah.johnson@example.com',
            fullName: 'Dr. Sarah Johnson',
            qualification: 'MBBS, MD (Cardiology)',
            specialization: 'Cardiology',
            registrationNumber: 'MED-CARD-2024-001',
            experienceYears: 15,
            bio: 'Experienced cardiologist with over 15 years of practice in preventive cardiology and heart disease management.',
            consultationFee: 500,
        },
        {
            email: 'dr.michael.chen@example.com',
            fullName: 'Dr. Michael Chen',
            qualification: 'MBBS, MD (Endocrinology)',
            specialization: 'Endocrinology',
            registrationNumber: 'MED-ENDO-2024-002',
            experienceYears: 12,
            bio: 'Specialist in diabetes management and hormonal disorders with a focus on lifestyle interventions.',
            consultationFee: 450,
        },
        {
            email: 'dr.priya.sharma@example.com',
            fullName: 'Dr. Priya Sharma',
            qualification: 'MBBS, MD (Dermatology)',
            specialization: 'Dermatology',
            registrationNumber: 'MED-DERM-2024-003',
            experienceYears: 10,
            bio: 'Dermatologist specializing in skin care, acne treatment, and cosmetic dermatology.',
            consultationFee: 400,
        },
        {
            email: 'dr.james.wilson@example.com',
            fullName: 'Dr. James Wilson',
            qualification: 'MBBS, MD (Psychiatry)',
            specialization: 'Psychiatry',
            registrationNumber: 'MED-PSY-2024-004',
            experienceYears: 18,
            bio: 'Psychiatrist with expertise in anxiety, depression, and stress management therapies.',
            consultationFee: 600,
        },
    ];

    const createdDoctors = [];
    for (const doctorData of doctors) {
        const { email, fullName, ...doctorProfile } = doctorData;
        const passwordHash = await bcrypt.hash('Doctor@123', 12);

        const user = await prisma.user.upsert({
            where: { email },
            update: {},
            create: {
                email,
                passwordHash,
                fullName,
                role: 'DOCTOR',
                isVerified: true,
                isActive: true,
            },
        });

        const doctor = await prisma.doctor.upsert({
            where: { userId: user.id },
            update: {},
            create: {
                userId: user.id,
                ...doctorProfile,
                approvalStatus: 'APPROVED',
                approvedById: admin.id,
                approvedAt: new Date(),
            },
        });

        createdDoctors.push(doctor);
        console.log(`✅ Doctor created: ${fullName}`);
    }

    // 4. Create Sample Blogs
    console.log('\n📝 Creating sample blogs...');
    const blogs = [
        {
            doctorIndex: 0, // Dr. Sarah Johnson
            categorySlug: 'heart-disease',
            title: 'Understanding Heart Health: Prevention and Care',
            content: `<h2>Introduction</h2>
<p>Heart disease remains one of the leading causes of death worldwide. However, many heart conditions are preventable through lifestyle changes and early detection.</p>

<h2>Risk Factors</h2>
<ul>
<li>High blood pressure</li>
<li>High cholesterol</li>
<li>Smoking</li>
<li>Obesity</li>
<li>Sedentary lifestyle</li>
</ul>

<h2>Prevention Strategies</h2>
<p>Regular exercise, a balanced diet rich in fruits and vegetables, stress management, and regular health check-ups are essential for maintaining heart health.</p>

<h2>Conclusion</h2>
<p>Taking care of your heart is a lifelong commitment. Start today with small, sustainable changes.</p>`,
            excerpt: 'Learn about heart disease prevention, risk factors, and how to maintain cardiovascular health through lifestyle changes.',
            tags: ['heart-health', 'prevention', 'cardiology'],
        },
        {
            doctorIndex: 1, // Dr. Michael Chen
            categorySlug: 'diabetes',
            title: 'Managing Diabetes Through Diet and Exercise',
            content: `<h2>Understanding Diabetes</h2>
<p>Diabetes is a chronic condition that affects how your body processes blood sugar. Proper management is crucial for preventing complications.</p>

<h2>Dietary Guidelines</h2>
<ul>
<li>Choose complex carbohydrates</li>
<li>Increase fiber intake</li>
<li>Limit processed sugars</li>
<li>Control portion sizes</li>
</ul>

<h2>Exercise Recommendations</h2>
<p>Regular physical activity helps control blood sugar levels. Aim for at least 150 minutes of moderate exercise per week.</p>

<h2>Monitoring</h2>
<p>Regular blood sugar monitoring and medical check-ups are essential for effective diabetes management.</p>`,
            excerpt: 'Discover effective strategies for managing diabetes through proper diet, exercise, and lifestyle modifications.',
            tags: ['diabetes', 'diet', 'exercise', 'blood-sugar'],
        },
        {
            doctorIndex: 2, // Dr. Priya Sharma
            categorySlug: 'skin-care',
            title: 'Essential Skin Care Tips for Healthy Glowing Skin',
            content: `<h2>The Importance of Skin Care</h2>
<p>Your skin is your body's largest organ and deserves proper care and attention.</p>

<h2>Daily Skin Care Routine</h2>
<ol>
<li>Cleanse gently twice daily</li>
<li>Apply toner to balance pH</li>
<li>Use serum for targeted treatment</li>
<li>Moisturize to hydrate</li>
<li>Apply sunscreen (SPF 30+)</li>
</ol>

<h2>Common Mistakes to Avoid</h2>
<ul>
<li>Over-washing your face</li>
<li>Skipping sunscreen</li>
<li>Using harsh products</li>
<li>Not removing makeup before bed</li>
</ul>

<h2>Professional Care</h2>
<p>Consult a dermatologist for persistent skin issues or personalized advice.</p>`,
            excerpt: 'Learn the fundamentals of skin care, daily routines, and expert tips for maintaining healthy, radiant skin.',
            tags: ['skincare', 'beauty', 'dermatology', 'health'],
        },
    ];

    for (const blogData of blogs) {
        const { doctorIndex, categorySlug, ...blogContent } = blogData;
        const doctor = createdDoctors[doctorIndex];
        const category = createdCategories.find(c => c.slug === categorySlug);

        const slug = blogContent.title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');

        const blog = await prisma.blog.create({
            data: {
                ...blogContent,
                slug,
                categoryId: category.id,
                doctorId: doctor.id,
                status: 'PUBLISHED',
                approvalStatus: 'APPROVED',
                approvedById: admin.id,
                approvedAt: new Date(),
                publishedAt: new Date(),
                viewsCount: Math.floor(Math.random() * 1000) + 100,
            },
        });

        console.log(`✅ Blog created: ${blog.title}`);
    }

    // 5. Create Sample Food Items
    console.log('\n🥗 Creating sample food items...');
    const foodItems = [
        {
            name: 'Carrot',
            slug: 'carrot',
            type: 'VEGETABLE',
            description: 'Rich in beta-carotene, fiber, and antioxidants. Excellent for eye health and immune system.',
            nutritionalInfo: {
                calories: 41,
                protein: '0.9g',
                carbs: '9.6g',
                fiber: '2.8g',
                vitamins: ['A', 'K', 'C', 'B6'],
                minerals: ['Potassium', 'Biotin'],
            },
            benefits: [
                {
                    categorySlug: 'diabetes',
                    benefits: 'Low glycemic index helps regulate blood sugar levels. High fiber content slows sugar absorption.',
                    recommendedQuantity: '1 cup daily (raw or cooked)',
                    warnings: 'Consume in moderation if on blood thinners due to vitamin K content.',
                    preparationTips: 'Best consumed raw in salads or lightly steamed to preserve nutrients.',
                },
                {
                    categorySlug: 'heart-disease',
                    benefits: 'Rich in potassium which helps lower blood pressure. Antioxidants reduce cholesterol.',
                    recommendedQuantity: '1/2 to 1 cup daily',
                    warnings: 'None for most people.',
                    preparationTips: 'Eat with a small amount of healthy fat to enhance vitamin A absorption.',
                },
            ],
        },
        {
            name: 'Spinach',
            slug: 'spinach',
            type: 'VEGETABLE',
            description: 'Nutrient-dense leafy green packed with vitamins, minerals, and antioxidants.',
            nutritionalInfo: {
                calories: 23,
                protein: '2.9g',
                carbs: '3.6g',
                fiber: '2.2g',
                vitamins: ['A', 'C', 'K', 'Folate'],
                minerals: ['Iron', 'Calcium', 'Magnesium'],
            },
            benefits: [
                {
                    categorySlug: 'diabetes',
                    benefits: 'High magnesium content improves insulin sensitivity. Low in carbs and calories.',
                    recommendedQuantity: '1-2 cups cooked daily',
                    warnings: 'High in oxalates; those with kidney stones should limit intake.',
                    preparationTips: 'Lightly sauté or add to smoothies. Avoid overcooking to preserve nutrients.',
                },
            ],
        },
        {
            name: 'Apple',
            slug: 'apple',
            type: 'FRUIT',
            description: 'Crunchy fruit rich in fiber, vitamins, and beneficial plant compounds.',
            nutritionalInfo: {
                calories: 95,
                protein: '0.5g',
                carbs: '25g',
                fiber: '4.4g',
                vitamins: ['C', 'K'],
                minerals: ['Potassium'],
            },
            benefits: [
                {
                    categorySlug: 'heart-disease',
                    benefits: 'Soluble fiber helps lower cholesterol. Polyphenols have antioxidant effects.',
                    recommendedQuantity: '1-2 medium apples daily',
                    warnings: 'Diabetics should monitor portion size due to natural sugar content.',
                    preparationTips: 'Eat with skin for maximum fiber. Pair with protein for balanced snack.',
                },
                {
                    categorySlug: 'digestive-health',
                    benefits: 'High fiber content promotes healthy digestion and regular bowel movements.',
                    recommendedQuantity: '1 apple daily',
                    warnings: 'May cause bloating in some individuals.',
                    preparationTips: 'Eat fresh or baked. Avoid apple juice which lacks fiber.',
                },
            ],
        },
    ];

    for (const foodData of foodItems) {
        const { benefits, ...foodItemData } = foodData;

        const foodItem = await prisma.foodItem.create({
            data: {
                ...foodItemData,
                createdById: admin.id,
                verifiedByDoctorId: createdDoctors[0].id,
                isVerified: true,
            },
        });

        // Create benefits
        for (const benefit of benefits) {
            const category = createdCategories.find(c => c.slug === benefit.categorySlug);
            await prisma.foodBenefit.create({
                data: {
                    foodItemId: foodItem.id,
                    diseaseCategoryId: category.id,
                    benefits: benefit.benefits,
                    recommendedQuantity: benefit.recommendedQuantity,
                    warnings: benefit.warnings,
                    preparationTips: benefit.preparationTips,
                },
            });
        }

        console.log(`✅ Food item created: ${foodItem.name}`);
    }

    // 6. Create Sample Ratings and Reviews
    console.log('\n⭐ Creating sample ratings and reviews...');
    const patientPasswordHash = await bcrypt.hash('Patient@123', 12);

    for (let i = 0; i < 3; i++) {
        const patient = await prisma.user.create({
            data: {
                email: `patient${i + 1}@example.com`,
                passwordHash: patientPasswordHash,
                fullName: `Patient ${i + 1}`,
                role: 'PATIENT',
                isVerified: true,
                isActive: true,
            },
        });

        // Rate each doctor
        for (const doctor of createdDoctors) {
            const rating = Math.floor(Math.random() * 2) + 4; // 4 or 5 stars

            await prisma.rating.create({
                data: {
                    doctorId: doctor.id,
                    userId: patient.id,
                    rating,
                },
            });

            // Add review for some doctors
            if (Math.random() > 0.5) {
                await prisma.review.create({
                    data: {
                        doctorId: doctor.id,
                        userId: patient.id,
                        reviewText: 'Excellent doctor! Very professional and caring. Highly recommended.',
                        isApproved: true,
                        approvedById: admin.id,
                        approvedAt: new Date(),
                    },
                });
            }
        }
    }
    console.log('✅ Ratings and reviews created');

    console.log('\n✨ Database seeding completed successfully!\n');
    console.log('📊 Summary:');
    console.log(`   - 1 Admin user`);
    console.log(`   - ${categories.length} Categories`);
    console.log(`   - ${doctors.length} Doctors`);
    console.log(`   - ${blogs.length} Blogs`);
    console.log(`   - ${foodItems.length} Food items`);
    console.log(`   - 3 Patient users`);
    console.log(`   - Multiple ratings and reviews`);
    console.log('\n🔑 Login Credentials:');
    console.log('   Admin: admin@doctorplatform.com / Admin@123');
    console.log('   Doctors: dr.sarah.johnson@example.com / Doctor@123');
    console.log('   Patients: patient1@example.com / Patient@123');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
